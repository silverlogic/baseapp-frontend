import { faker } from '@faker-js/faker'

export const mockUserProfileFactory = (id: string) => {
  return {
    data: {
      me: {
        profile: {
          id,
          name: faker.person.fullName(),
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
