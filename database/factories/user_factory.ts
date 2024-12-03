import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'password',
      avatar: faker.image.avatar(),
      solde: faker.number.int({ min: 0, max: 100000 }),
      isVerified: true,
      isAdmin: faker.datatype.boolean(),
      isSuperAdmin: faker.datatype.boolean(),

    }
  })
  .build()
