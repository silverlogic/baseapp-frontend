const createNodeProfile = (
  index: number,
  status = 'ACTIVE',
  name: string,
  image?: string,
  full?: boolean,
) => {
  return {
    node: {
      id: `role-id-${index}`,
      user: {
        profile: {
          id: `id-${index}`,
          name: full ? `${name} Profile ${index}` : `${name} Profile`,
          image: image || null,
          urlPath: null,
        },
        id: `user-id-${index}`,
      },
      role: 'MANAGER',
      status: status,
      __typename: 'ProfileUserRole',
    },
    cursor: `cursor-${index}`,
  }
}

export const simpleMembersListMockData = {
  data: {
    profile: {
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Owner Profile',
      image: null,
      urlPath: null,
      owner: {
        id: 'owner-user-id',
        profile: {
          id: 'owner-profile-id',
          name: 'Owner Profile',
          image: null,
          urlPath: null,
        },
      },
      members: {
        totalCount: 1,
        edges: [
          {
            node: {
              id: 'UHJvZmlsZVVzZXJSb2xlOjEx',
              user: {
                profile: {
                  id: 'UHJvZmlsZTo0',
                  name: 'Manager Profile',
                  image: null,
                  urlPath: null,
                },
                id: 'VXNlcjo0',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
          },
        ],
        pageInfo: {
          endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
          hasNextPage: false,
        },
      },
    },
  },
}

export const allRolesMembersListMockData = {
  data: {
    profile: {
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Owner Profile',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
      urlPath: null,
      owner: {
        id: 'owner-user-id',
        profile: {
          id: 'owner-profile-id',
          name: 'Owner Profile',
          image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
          urlPath: null,
        },
      },
      members: {
        totalCount: 3,
        edges: [
          createNodeProfile(
            1,
            'PENDING',
            'Pending',
            'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/django.svg',
          ),
          createNodeProfile(
            2,
            'INACTIVE',
            'Inactive',
            'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/javascript.svg',
          ),
          createNodeProfile(3, 'ACTIVE', 'Manager'),
        ],
        pageInfo: {
          endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
          hasNextPage: false,
        },
      },
    },
  },
}

export const fullMembersListMockData = {
  data: {
    profile: {
      canChangeRole: true,
      id: 'owner-id',
      name: 'Owner Profile',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
      urlPath: null,
      owner: {
        id: 'owner-user-id',
        profile: {
          id: 'owner-profile-id',
          name: 'Owner Profile',
          image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
          urlPath: null,
        },
      },
      members: {
        totalCount: 6,
        edges: [
          createNodeProfile(1, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(2, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(3, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(4, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(5, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(6, 'ACTIVE', 'Manager', undefined, true),
        ],
        pageInfo: {
          endCursor: 'cursor-10',
          hasNextPage: true,
        },
      },
    },
  },
}

export const fullMembersListNextPageMockData = {
  data: {
    node: {
      __typename: 'Profile',
      canChangeRole: true,
      id: 'owner-id',
      name: 'Owner Profile',
      image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
      urlPath: null,
      owner: {
        id: 'owner-user-id',
        profile: {
          id: 'owner-profile-id',
          name: 'Owner Profile',
          image: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
          urlPath: null,
        },
      },
      members: {
        totalCount: 9,
        edges: [
          createNodeProfile(7, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(8, 'ACTIVE', 'Manager', undefined, true),
          createNodeProfile(9, 'ACTIVE', 'Manager', undefined, true),
        ],
        pageInfo: {
          endCursor: 'cursor-11',
          hasNextPage: false,
        },
      },
    },
  },
}

export const updateMemberRoleMockData = {
  data: {
    profileUserRoleUpdate: {
      profileUserRole: {
        id: 'UHJvZmlsZVVzZXJSb2xlOjEx',
        role: 'ADMIN',
      },
      errors: null,
    },
  },
}

/** A profile without an owner, run by its admin. */
export const ownerlessMembersListMockData = {
  data: {
    profile: {
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Ownerless Organization',
      image: null,
      urlPath: null,
      owner: null,
      members: {
        totalCount: 1,
        edges: [
          {
            node: {
              id: 'role-id-admin',
              user: {
                profile: { id: 'id-admin', name: 'Admin Profile', image: null, urlPath: null },
                id: 'user-id-admin',
              },
              role: 'ADMIN',
              status: 'ACTIVE',
              invitedEmail: null,
              invitationExpiresAt: null,
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-admin',
          },
        ],
        pageInfo: { endCursor: 'cursor-admin', hasNextPage: false },
      },
    },
  },
}

/** The members list of `simpleMembersListMockData`, where the signed-in profile may add members. */
export const addableMembersListMockData = {
  data: {
    profile: { ...simpleMembersListMockData.data.profile, canAddMember: true },
  },
}

const managerMemberRole = (status: 'ACTIVE' | 'INACTIVE') => ({
  id: 'UHJvZmlsZVVzZXJSb2xlOjEx',
  user: {
    profile: { id: 'UHJvZmlsZTo0', name: 'Manager Profile', image: null, urlPath: null },
    id: 'VXNlcjo0',
  },
  role: 'MANAGER',
  status,
  invitedEmail: null,
  invitationExpiresAt: null,
  deactivatedAt: status === 'INACTIVE' ? '2026-10-22T12:00:00+00:00' : null,
})

export const deactivateMemberMockData = {
  data: {
    profileMemberDeactivate: { profileUserRole: managerMemberRole('INACTIVE'), errors: null },
  },
}

export const reactivateMemberMockData = {
  data: {
    profileMemberReactivate: { profileUserRole: managerMemberRole('ACTIVE'), errors: null },
  },
}

/**
 * `addableMembersListMockData` as a project's `MembersWithProjectFragmentQuery` returns it: the
 * member also carries the project row fragment's fields.
 */
export const projectFragmentMembersListMockData = {
  data: {
    profile: {
      ...addableMembersListMockData.data.profile,
      members: {
        ...simpleMembersListMockData.data.profile.members,
        edges: simpleMembersListMockData.data.profile.members.edges.map((edge) => ({
          ...edge,
          node: { ...edge.node, invitedFirstName: 'Ada', invitedLastName: 'Lovelace' },
        })),
      },
    },
  },
}
