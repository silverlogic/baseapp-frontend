import { faker } from '@faker-js/faker'

export const mockUserProfileFactory = (id: string) => {
  return {
    data: {
      me: {
        profile: {
          id,
          name: faker.name.fullName(),
          image: {
            url: faker.image.avatar(),
          },
          urlPath: {
            path: faker.internet.url(),
          },
        },
      },
    },
  }
}

export const mockProfilesListFactory = (size: number, userProfile: any) => {
  return {
    data: {
      me: {
        profiles: [
          userProfile,
          ...Array.from({ length: size }).map((_, index) => ({
            id: `profile-${index}`,
            name: faker.name.fullName(),
            image: {
              url: faker.image.avatar(),
            },
            urlPath: {
              path: faker.internet.url(),
            },
          })),
        ],
      },
    },
  }
}

export const mockUserProfileData = mockUserProfileFactory('user-profile-1')

export const emptyMockUserProfileData = {
  data: {
    me: {
      profile: null,
    },
  },
}
