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
          {
            node: {
              id: 'UHJvZmlsZVVzZXJSb2xlOjEw',
              user: {
                profile: {
                  id: 'UHJvZmlsZToz',
                  name: 'Pending Profile',
                  image: {
                    url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/django.svg',
                  },
                  urlPath: null,
                },
                id: 'VXNlcjoz',
              },
              role: 'MANAGER',
              status: 'PENDING',
              __typename: 'ProfileUserRole',
            },
            cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
          },
          {
            node: {
              id: 'UHJvZmlsZVVzZXJSb2xlOjEx',
              user: {
                profile: {
                  id: 'UHJvZmlsZTo0',
                  name: 'Inactive Profile',
                  image: {
                    url: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/javascript.svg',
                  },
                  urlPath: null,
                },
                id: 'VXNlcjo0',
              },
              role: 'MANAGER',
              status: 'INACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
          },
          {
            node: {
              id: 'UHJvZmlsZVVzZXJSb2xlOjk=',
              user: {
                profile: {
                  id: 'UHJvZmlsZToy',
                  name: 'Manager Profile',
                  image: null,
                  urlPath: null,
                },
                id: 'VXNlcjoy',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'YXJyYXljb25uZWN0aW9uOjI=',
          },
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
        totalCount: 3,
        edges: [
          {
            node: {
              id: 'id-1',
              user: {
                profile: {
                  id: 'id-1',
                  name: 'Manager Profile 1',
                  image: null,
                  urlPath: null,
                },
                id: 'id-1',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-1',
          },
          {
            node: {
              id: 'id-2',
              user: {
                profile: {
                  id: 'id-2',
                  name: 'Manager Profile 2',
                  image: null,
                  urlPath: null,
                },
                id: 'id-2',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-2',
          },
          {
            node: {
              id: 'id-3',
              user: {
                profile: {
                  id: 'id-3',
                  name: 'Manager Profile 3',
                  image: null,
                  urlPath: null,
                },
                id: 'id-3',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-3',
          },
          {
            node: {
              id: 'id-4',
              user: {
                profile: {
                  id: 'id-4',
                  name: 'Manager Profile 4',
                  image: null,
                  urlPath: null,
                },
                id: 'id-4',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-4',
          },
          {
            node: {
              id: 'id-5',
              user: {
                profile: {
                  id: 'id-5',
                  name: 'Manager Profile 5',
                  image: null,
                  urlPath: null,
                },
                id: 'id-5',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-5',
          },
          {
            node: {
              id: 'id-6',
              user: {
                profile: {
                  id: 'id-6',
                  name: 'Manager Profile 6',
                  image: null,
                  urlPath: null,
                },
                id: 'id-6',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-6',
          },
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
        totalCount: 3,
        edges: [
          {
            node: {
              id: 'id-7',
              user: {
                profile: {
                  id: 'id-7',
                  name: 'Manager Profile 7',
                  image: null,
                  urlPath: null,
                },
                id: 'id-7',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-7',
          },
          {
            node: {
              id: 'id-8',
              user: {
                profile: {
                  id: 'id-8',
                  name: 'Manager Profile 8',
                  image: null,
                  urlPath: null,
                },
                id: 'id-8',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-8',
          },
          {
            node: {
              id: 'id-9',
              user: {
                profile: {
                  id: 'id-9',
                  name: 'Manager Profile 9',
                  image: null,
                  urlPath: null,
                },
                id: 'id-9',
              },
              role: 'MANAGER',
              status: 'ACTIVE',
              __typename: 'ProfileUserRole',
            },
            cursor: 'cursor-9',
          },
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
