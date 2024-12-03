import factory from '@adonisjs/lucid/factories'
import Withdrawal from '#models/withdrawal'

export const WithdrawalFactory = factory
  .define(Withdrawal, async ({ faker }) => {
    return {
      amount: faker.number.int({ min: 0, max: 10000 }),
      method: faker.word.sample(),
      cost: faker.number.int({ min: 0, max: 10000 }),
      isValidated: faker.datatype.boolean(),
      phoneNumber: faker.phone.number()
    }
  })
  .build()
