---
"@baseapp-frontend/components": major
---

**Breaking:** the profiles module's Relay documents now need a baseapp-backend with the profile
invitation lifecycle, and `ProfileMembers` can be extended without a fork.

This needs the matching backend: the baseapp-backend release that adds `profileMemberDeactivate`,
`profileMemberReactivate`, `profileAcceptInvitationWithSignup`, the `profileInvitationPreview` query,
`invitees` and `message` on `profileSendInvitation`, the `CANCELLED` status and a nullable
`Profile.owner`. Projects that compile this package's sources with their own schema, such as the
template projects, fail `relay-compiler` against an older schema (unknown field or type). Upgrade
the backend first, run `pnpm relay:download-schema`, then upgrade this package and run `pnpm relay`.
At runtime the default members list and invite dialog query no new fields, and only send the new
mutations when a project opts in.

- Fix: `ProfileMembers` asks `hasPerm` for `change_profileuserrole` / `add_profileuserrole` without
  the `baseapp_profiles.` app label, so members can be managed in projects that swap the profile
  models into their own app (the dotted permission was always false there). Needs a backend whose
  `hasPerm` normalizes permissions (March 2026 or later).
- Fix: a profile without an owner shows no owner row.
- `ProfileMembers` and `MembersList` take `roleOptions`, `inactiveMemberOptions`, `roleLabels`,
  `statusLabels`, `MemberItem`, `MemberItemProps`, `InviteMemberDialog` and
  `InviteMemberDialogProps`. A custom `MemberItem` also receives the row's `memberRef`. Project role
  labels also name the roles in the active member's menu.
- `ProfileMembers` takes `membersQuery`, `membersQueryVariables` and `membersListFragment` (also on
  `MembersList`), so a project can page through members with more arguments (`status`) and spread
  its own `ProfileUserRole` fragment for a custom `MemberItem`. The list now prepends invitations
  into the connection it shows (`__id`).
- Members can be deactivated (opt-in `DEACTIVATE_MEMBER_OPTION` in `roleOptions`, with a
  confirmation) and reactivated (opt-in `inactiveMemberOptions={inactiveMemberActionOptions}`);
  without it an `INACTIVE` member stays read-only, as before. `MEMBER_STATUSES` gains `CANCELLED`.
- `InviteMemberDialog` takes `defaultRole`, a `roleOptions` picker, `collectInviteeNames`,
  `showMessageField`, `renderExtraFields` (values merged into the `profileSendInvitation` and
  `profileUserRoleCreate` inputs) with `extraFieldsDefaultValues` and `validateExtraFields`, and
  `copy`. Without them it sends the same `emails` input as before.
- New common hooks: `useProfileMemberDeactivateMutation`, `useProfileMemberReactivateMutation`,
  `useProfileInvitationPreviewQuery`, `useAcceptInvitationWithSignupMutation`,
  `useAcceptInvitationMutation` and `useDeclineInvitationMutation`.
- The profiles web barrel exports `MembersList`, `MemberItem`, `InviteMemberDialog` and the member
  constants (`MEMBER_ACTIONS`, `MEMBER_ROLES`, `MEMBER_STATUSES`, `DEACTIVATE_MEMBER_OPTION`,
  `inactiveMemberActionOptions`, `memberRoleOptions`).
