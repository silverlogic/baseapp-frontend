import { faker } from '@faker-js/faker'

export const userMockData = {
  id: faker.datatype.number({ min: 1, max: 1000 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: {
    small: faker.image.avatar(),
  },
}
