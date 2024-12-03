import factory from '@adonisjs/lucid/factories'
import Increase from '#models/increase'

export const IncreaseFactory = factory
  .define(Increase, async ({ faker }) => {
    return {
      amount: faker.number.int({ min: 0, max: 10000 }),
    }
  })
  .build()
