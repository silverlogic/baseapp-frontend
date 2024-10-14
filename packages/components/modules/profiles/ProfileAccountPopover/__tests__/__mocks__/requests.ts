import { faker } from '@faker-js/faker'

export const mockUserProfileData = {
  data: {
    me: {
      profile: {
        id: 'user-profile-1',
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

export const mockProfilesListData = (size: number) => {
  return {
    data: {
      me: {
        profiles: [
          mockUserProfileData.data.me.profile,
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
