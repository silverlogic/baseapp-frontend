import { faker } from '@faker-js/faker'

export const mockUserProfile = (id: string) => {
  return {
    id,
    name: faker.person.fullName(),
    image: {
      url: faker.image.avatar(),
    },
    urlPath: {
      path: faker.internet.url(),
    },
  }
}

export const mockUserProfileFactory = (id: string) => {
  return {
    data: {
      me: {
        id,
        profile: mockUserProfile(id),
      },
    },
  }
}
