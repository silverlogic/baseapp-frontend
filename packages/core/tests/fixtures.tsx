import { faker } from '@faker-js/faker'

export const signupUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  acceptConsent: true,
}

export const user = {
  email: faker.internet.email(),
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  isEmailVerified: true,
  isNewEmailConfirmed: false,
  newEmail: '',
  referralCode: '1234',
}
