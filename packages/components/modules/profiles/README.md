# Module: `profiles`

This module is divided into three primary folders:

- **`common/`**: Contains platform-independent logic (utilities, hooks, or components that work in both web and native).
  - Can import from within or other `common/` folders.
  - Must not import from `web/` or `native/`.
- **`web/`**: Contains web-specific components and logic (e.g., React DOM, browser APIs, Material UI and others).
  - Can import from within or `common/`.
  - Must not import from `native/`.
- **`native/`**: Contains native-specific components and logic (e.g., React Native, Expo, React Native Paper and others)
  - Can import from within or `common/`.
  - Must not import from `web/`.

This structure ensures platform-specific code remains isolated, while shared code lives in one place.

## Members and invitations

`ProfileMembers` (web) lists the members and invitations of the current profile and lets those
who may manage them add members, invite by email, change roles, deactivate, reactivate and remove.
Everything below is optional; with no props it behaves as before.

### Backend compatibility

The component reads `hasPerm(perm: "change_profileuserrole")` / `"add_profileuserrole"` without an
app label, so the backend adds the `Profile` model's own. That needs a baseapp-backend whose
`hasPerm` normalizes permissions (March 2026 or later); in exchange it works in projects that swap
the profile models into their own app, where the old `baseapp_profiles.` label always answered
false. The label is the `Profile` model's, so it is right whenever `Profile` and `ProfileUserRole`
share an app (stock BaseApp, or both swapped into one app). A project that swaps only one of them
passes its own `membersListFragment` (below) asking for the labelled permissions.

Deactivation, reactivation, invitee names, the invitation message, the invitation preview and
accept-with-signup need the baseapp-backend release with the profile invitation lifecycle
(`profileMemberDeactivate`, `profileMemberReactivate`, `profileAcceptInvitationWithSignup`,
`profileInvitationPreview`, `invitees` and `message` on `profileSendInvitation`). A project that
compiles this package's sources against its own `schema.graphql` (the template projects do) must
download the schema from that backend before it runs `pnpm relay`. At runtime the default list and
dialog query no new fields and only send the new mutations when a project opts in, so the default
screens keep working against an older backend.

### Customizing the list

```tsx
import {
  DEACTIVATE_MEMBER_OPTION,
  MEMBER_ACTIONS,
  ProfileMembers,
  inactiveMemberActionOptions,
} from '@baseapp-frontend/components/profiles/web'

const TeamPage = () => (
  <ProfileMembers
    title="Team"
    // The menu of an active member: project roles plus actions.
    roleOptions={[
      { value: 'ADMIN', label: 'Admin' },
      { value: 'MANAGER', label: 'Member' },
      DEACTIVATE_MEMBER_OPTION,
      { value: MEMBER_ACTIONS.remove, label: 'Remove' },
    ]}
    // Reactivate and Remove on a deactivated member (needs profileMemberReactivate).
    inactiveMemberOptions={inactiveMemberActionOptions}
    // Role labels, used in every row and in the menu; status labels, shown in place of a role.
    roleLabels={{ OWNER: 'Owner', MANAGER: 'Member' }}
    statusLabels={{ PENDING: 'Invited' }}
  />
)
```

| Prop (`ProfileMembers` and `MembersList`)                        | Default                          | What it does                                                                                                                                                                 |
| ---------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `roleOptions`                                                    | Admin, Manager, Remove           | Menu of an active member. Values are `ProfileRoles` values (a project's own roles too) or `MEMBER_ACTIONS` (`REMOVE`, `DEACTIVATE`). Choosing `ADMIN` asks for confirmation. |
| `inactiveMemberOptions`                                          | none (read-only)                 | Menu of a deactivated (`INACTIVE`) member, for those who can change members. Pass `inactiveMemberActionOptions` for Reactivate and Remove.                                   |
| `roleLabels` / `statusLabels`                                    | capitalized value                | Display labels by role (`OWNER` included; they also win over the `roleOptions` labels in the menu) or status (`PENDING`, `EXPIRED`, `INACTIVE`, `CANCELLED`, ...).           |
| `MemberItem` / `MemberItemProps`                                 | `MemberItem`                     | The row component and props for every row. A custom row also receives `memberRef`, the row's `MemberItemFragment` ref (not on the owner row).                                |
| `InviteMemberDialog` / `InviteMemberDialogProps`                 | `InviteMemberDialog`             | The dialog behind "Add Member". It always receives `open`, `onClose` and the list's `connections`; `InviteMemberDialogProps.connections` are added to them.                  |
| `membersListFragment`                                            | `UserMembersListFragment`        | A project's members pagination fragment; see "Project fields on each row" below.                                                                                             |
| `membersQuery` / `membersQueryVariables` (`ProfileMembers` only) | `UserMembersListPaginationQuery` | The query that loads the profile through `membersListFragment`, and its extra variables (`{ status: 'ACTIVE' }`, say).                                                       |
| `MembersListProps` (`ProfileMembers` only)                       |                                  | Any other `MembersList` prop; wins over the same prop given directly.                                                                                                        |

`MEMBER_STATUSES` includes `CANCELLED` (a withdrawn invitation kept as history by the backend), which
renders read-only. A profile without an owner (one its admins run) shows no owner row.

`MembersList`, `MemberItem`, `InviteMemberDialog`, `MEMBER_ACTIONS`, `MEMBER_ROLES`,
`MEMBER_STATUSES`, `DEACTIVATE_MEMBER_OPTION`, `inactiveMemberActionOptions` and
`memberRoleOptions` (the default menu) are exported from `@baseapp-frontend/components/profiles/web`
for projects that wrap or extend them.

### Project fields on each row

A custom `MemberItem` receives `memberRef`, the row's `ProfileUserRole` ref. To read the project's
own fields through it (a job title, say), or to page through `members` with more arguments (such
as `status`), the project copies `UserMembersListFragment` into its own `@refetchable` fragment,
spreads its row fragment next to `...MemberItemFragment`, and loads it with its own query. The
fragment must keep every field and argument of `UserMembersListFragment` under the same names, and
select `__id` on the connection so "Add Member" prepends into the list shown.

```tsx
const TeamMembersListFragment = graphql`
  fragment TeamMembersListFragment on Profile
  @refetchable(queryName: "TeamMembersListPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
    orderBy: { type: "String" }
    q: { type: "String" }
    status: { type: "ProfileRoleStatus" }
  ) {
    id
    canChangeRole: hasPerm(perm: "change_profileuserrole")
    canAddMember: hasPerm(perm: "add_profileuserrole")
    ...ProfileItemFragment
    owner {
      id
      profile {
        ...ProfileItemFragment
      }
    }
    members(first: $count, after: $cursor, orderBy: $orderBy, q: $q, status: $status)
      @connection(key: "TeamMembersListFragment_members", filters: ["orderBy", "q", "status"]) {
      __id
      totalCount
      edges {
        cursor
        node {
          ...MemberItemFragment
          ...TeamMemberRowFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

const TeamMembersQuery = graphql`
  query TeamMembersQuery(
    $count: Int = 10
    $cursor: String
    $orderBy: String
    $profileId: ID!
    $q: String
    $status: ProfileRoleStatus
  ) {
    profile(id: $profileId) {
      id
      ...TeamMembersListFragment
        @arguments(count: $count, cursor: $cursor, orderBy: $orderBy, q: $q, status: $status)
    }
  }
`

const TeamMemberItem = ({ memberRef, ...props }: MemberItemProps) => {
  const row = useFragment(TeamMemberRowFragment, memberRef as TeamMemberRowFragment$key)
  return (
    <>
      <MemberItem {...props} />
      <Typography variant="caption">{row?.title}</Typography>
    </>
  )
}

;<ProfileMembers
  membersQuery={TeamMembersQuery}
  membersQueryVariables={{ status: 'ACTIVE' }}
  membersListFragment={TeamMembersListFragment}
  MemberItem={TeamMemberItem}
/>
```

`memberRef` is typed as the `MemberItemFragment` ref, so the row reads its own fragment with a cast
as above.

### Customizing the invite dialog

```tsx
<ProfileMembers
  InviteMemberDialogProps={{
    defaultRole: 'MANAGER',
    roleOptions: [
      { value: 'ADMIN', label: 'Admin' },
      { value: 'MANAGER', label: 'Member' },
    ],
    collectInviteeNames: true,
    showMessageField: true,
    extraFieldsDefaultValues: { title: '' },
    validateExtraFields: (values) => Boolean(values.title),
    renderExtraFields: ({ values, setValue, disabled }) => (
      <TextField
        size="small"
        label="Job title"
        value={values.title}
        onChange={(event) => setValue('title', event.target.value)}
        disabled={disabled}
      />
    ),
    copy: { title: 'Invite to the team', submit: 'Send invitations' },
  }}
/>
```

| Prop (`InviteMemberDialog`) | Default       | What it does                                                                                                                                                                                                                  |
| --------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultRole`               | `MANAGER`     | Role of added members and invitations, until one is picked in the dialog.                                                                                                                                                     |
| `roleOptions`               | none          | When given, shows a role picker with these roles.                                                                                                                                                                             |
| `collectInviteeNames`       | `false`       | Asks for each invited email's first and last name, sent as `invitees`.                                                                                                                                                        |
| `showMessageField`          | `false`       | A personal note sent with the invitation emails (`message`).                                                                                                                                                                  |
| `renderExtraFields`         | none          | Renders project fields; their values (by GraphQL input name) are merged into the `profileSendInvitation` and `profileUserRoleCreate` inputs. Declare the same fields on both mutations in the backend (`ExtensibleMutation`). |
| `extraFieldsDefaultValues`  | `{}`          | Initial extra values, restored when the dialog closes.                                                                                                                                                                        |
| `validateExtraFields`       | none          | Return `false` to keep the submit button disabled.                                                                                                                                                                            |
| `copy`                      | English texts | Replaces any of the dialog's texts (`title`, `description`, `searchPlaceholder`, `cancel`, `submit`, `roleLabel`, `inviteeNamesTitle`, `firstNameLabel`, `lastNameLabel`, `messageLabel`, `messagePlaceholder`).              |

Without names or a message the dialog sends `emails`, exactly as before.

### Hooks (common)

Exported from `@baseapp-frontend/components/profiles/common`. The mutation hooks return
`[commit, isMutationInFlight]`, toast errors (and success where it says so) and then call the
caller's `onCompleted` / `onError`.

| Hook                                                                    | Operation                           | Notes                                                                                                                                                                                                 |
| ----------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useProfileMemberDeactivateMutation`                                    | `profileMemberDeactivate`           | Input `{ profileId, userId, reason? }`. Toasts "Member deactivated".                                                                                                                                  |
| `useProfileMemberReactivateMutation`                                    | `profileMemberReactivate`           | Input `{ profileId, userId }`. Toasts "Member reactivated".                                                                                                                                           |
| `useProfileInvitationPreviewQuery(token, { imageSize?, fetchPolicy? })` | `profileInvitationPreview`          | The public summary for an acceptance page: profile name and image, invited email and name, inviter, message, role, status, expiry and `requiresSignIn`. Suspends; `null` for an unknown token.        |
| `useAcceptInvitationWithSignupMutation`                                 | `profileAcceptInvitationWithSignup` | Accept without an account: input `{ token, password, firstName?, lastName? }`; the payload's `email` is the account to sign in with. Needs no sign-in, and the backend must enable invitation signup. |
| `useAcceptInvitationMutation`                                           | `profileAcceptInvitation`           | Accept as the signed-in user; returns the membership and the profile.                                                                                                                                 |
| `useDeclineInvitationMutation`                                          | `profileDeclineInvitation`          | Decline as the signed-in user.                                                                                                                                                                        |

The backend reports refusals (expired or cancelled invitation, an account that must sign in, the
last admin) as GraphQL errors with a stable `extensions.code`, which reach `onCompleted` as its
`errors` argument.

```tsx
const InvitationPage = ({ token }: { token: string }) => {
  const invitation = useProfileInvitationPreviewQuery(token)
  const [acceptWithSignup, isAccepting] = useAcceptInvitationWithSignupMutation()

  if (!invitation) return <p>This invitation link is not valid.</p>
  if (invitation.status !== 'PENDING')
    return <p>This invitation is {invitation.status.toLowerCase()}.</p>
  if (invitation.requiresSignIn) return <SignInToAccept email={invitation.invitedEmail} />

  return (
    <SetPasswordForm
      email={invitation.invitedEmail}
      disabled={isAccepting}
      onSubmit={(password) =>
        acceptWithSignup({
          variables: { input: { token, password } },
          onCompleted: (response) => {
            if (response.profileAcceptInvitationWithSignup?.success)
              signIn(response.profileAcceptInvitationWithSignup.email)
          },
        })
      }
    />
  )
}
```
