import { MinimalProfile } from '@baseapp-frontend/authentication'

import { faker } from '@faker-js/faker'

export const mockUserProfileFactory = (id: string = 'user-profile-1') => {
  return {
    id,
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    urlPath: faker.internet.url(),
  }
}

export const mockProfilesListFactory = (userProfile: MinimalProfile) => {
  return {
    data: {
      me: {
        id: 'user-profile-1',
        profiles: {
          edges: [
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
              node: {
                id: userProfile.id,
                name: userProfile.name,
                image: {
                  url: userProfile.image,
                },
                urlPath: {
                  path: userProfile.urlPath,
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
              node: {
                id: 'UHJvZmlsZTo0',
                name: 'Second Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'second-profile',
                  id: 'VVJMUGF0aDoz',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjI=',
              node: {
                id: 'UHJvZmlsZToxOA==',
                name: 'Third Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'third-profile',
                  id: 'VVJMUGF0aDoxNg==',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjM=',
              node: {
                id: 'UHJvZmlsZToxMQ==',
                name: 'Fourth Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'fourth-profile',
                  id: 'VVJMUGF0aDoxMA==',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
              node: {
                id: 'UHJvZmlsZTo2',
                name: 'Fifth Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'fifth-profile',
                  id: 'VVJMUGF0aDo1',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjU=',
              node: {
                id: 'UHJvZmlsZTo3',
                name: 'Sixth Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'sixth-profile',
                  id: 'VVJMUGF0aDo2',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjY=',
              node: {
                id: 'UHJvZmlsZTo4',
                name: 'Seventh Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'seventh-profile',
                  id: 'VVJMUGF0aDo3',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjc=',
              node: {
                id: 'UHJvZmlsZTo5',
                name: 'Eighth Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'eighth-profile',
                  id: 'VVJMUGF0aDo4',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjg=',
              node: {
                id: 'UHJvZmlsZToyMA==',
                name: 'Ninth Profile',
                image: null,
                urlPath: {
                  path: 'ninth-profile',
                  id: 'VVJMUGF0aDoxOA==',
                },
                __typename: 'Profile',
              },
            },
            {
              cursor: 'YXJyYXljb25uZWN0aW9uOjk=',
              node: {
                id: 'UHJvZmlsZTox',
                name: 'Tenth Profile',
                image: {
                  url: faker.image.avatar(),
                },
                urlPath: {
                  path: 'tenth-profile',
                  id: 'VVJMUGF0aDoxMQ==',
                },
                __typename: 'Profile',
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'YXJyYXljb25uZWN0aW9uOjk=',
          },
        },
      },
    },
  }
}

export const mockUserProfileData = mockUserProfileFactory('user-profile-1')

export const emptyMockUserProfileData = null

export const mockAddProfileData = (userId: string = 'user-profile-1') => {
  return {
    data: {
      me: {
        canAdd: true,
        id: userId,
        __typename: 'User',
      },
    },
  }
}
