import { faker } from '@faker-js/faker'

export const mockUserProfileData = {
  data: {
    me: {
      profile: {
        id: 'profile-1',
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

export const mockProfilesListData = {
  data: {
    profiles: [
      {
        id: 'profile-1',
        name: faker.name.fullName(),
        image: {
          url: faker.image.avatar(),
        },
        urlPath: {
          path: faker.internet.url(),
        },
      },
      {
        id: 'profile-2',
        name: faker.name.fullName(),
        image: {
          url: faker.image.avatar(),
        },
        urlPath: {
          path: faker.internet.url(),
        },
      },
      {
        id: 'profile-3',
        name: faker.name.fullName(),
        image: {
          url: faker.image.avatar(),
        },
        urlPath: {
          path: faker.internet.url(),
        },
      },
    ],
  },
}
