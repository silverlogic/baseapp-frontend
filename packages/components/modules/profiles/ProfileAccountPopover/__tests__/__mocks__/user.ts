import { faker } from '@faker-js/faker'

export const userMockData = {
  id: 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: {
    small: faker.image.avatar(),
  },
}

export const userMockData2 = {
  id: 2,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: {
    small: faker.image.avatar(),
  },
}