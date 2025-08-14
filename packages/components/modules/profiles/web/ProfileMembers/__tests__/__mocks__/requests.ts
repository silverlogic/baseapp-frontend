const createNodeProfile = (
  index: number,
  status = 'ACTIVE',
  name: string,
  image?: {
    url: string
  },
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
      pk: 1,
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Owner Profile',
      image: null,
      urlPath: null,
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
      pk: 1,
      canChangeRole: true,
      id: 'UHJvZmlsZTox',
      name: 'Owner Profile',
      image: {
        url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
      },
      urlPath: null,
      members: {
        totalCount: 3,
        edges: [
          createNodeProfile(1, 'PENDING', 'Pending', {
            url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/django.svg',
          }),
          createNodeProfile(2, 'INACTIVE', 'Inactive', {
            url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/javascript.svg',
          }),
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
      pk: 1,
      canChangeRole: true,
      id: 'owner-id',
      name: 'Owner Profile',
      image: {
        url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
      },
      urlPath: null,
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
      image: {
        url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg',
      },
      urlPath: null,
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
    profileRoleUpdate: {
      profileUserRole: {
        id: 'UHJvZmlsZVVzZXJSb2xlOjEx',
        role: 'ADMIN',
      },
      errors: null,
    },
  },
}
