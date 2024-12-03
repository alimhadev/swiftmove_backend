import factory from '@adonisjs/lucid/factories'
import Subscribe from '#models/subscribe'
import { DateTime } from 'luxon'
import { IncreaseFactory } from './increase_factory.js'
import { ReactivationFactory } from './reactivation_factory.js'

export const SubscribeFactory = factory
  .define(Subscribe, async ({ faker }) => {
    return {
      leftDays: faker.number.int({ min: 0, max: 30 }),
      fakeMonths: faker.number.int({ min: 1, max: 6 }),
      lastActivity: DateTime.fromJSDate(faker.date.between({ from: '2024-06-01T00:00:00.000Z', to: '2024-12-01T00:00:00.000Z' })),
      state:'active',
      investmentPlanId:faker.number.int({min:1,max:9})

    }
  }).state('inactive', (subscribe) => {
    subscribe.state = 'inactive'
  })
  .relation('increases', () => IncreaseFactory)
  .relation('reactivations',() =>ReactivationFactory)
  .build()
