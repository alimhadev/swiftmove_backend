import factory from '@adonisjs/lucid/factories'
import Deposit from '#models/deposit'

export const DepositFactory = factory
  .define(Deposit, async ({ faker }) => {
    return {
      amount: faker.number.int({ min: 0, max: 10000 }),
      method: faker.word.sample(),
      // cost: faker.number.int({ min: 0, max: 10000 }),
      isValidated: faker.datatype.boolean(),
      // state: faker.word.sample(),
      photo: faker.image.urlPicsumPhotos(),
      userId:faker.number.int({min:1, max:15})
    }
  })
  .build()
