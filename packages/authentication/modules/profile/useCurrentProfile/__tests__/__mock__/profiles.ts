import { faker } from '@faker-js/faker'

export const mockUserProfileFactory = (id: string) => {
  return {
    id,
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    urlPath: faker.internet.url(),
    pk: faker.number.int(),
  }
}
