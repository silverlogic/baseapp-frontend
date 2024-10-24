import { faker } from '@faker-js/faker'

export const userMockData = {
  id: faker.number.int({ min: 1, max: 1000 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  avatar: {
    small: faker.image.avatar(),
  },
}
