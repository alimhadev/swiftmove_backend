import factory from '@adonisjs/lucid/factories'
import InvestmentPlan from '#models/investment_plan'
// import { VehicleFactory } from './vehicle_factory.js'
// import { UserFactory } from './user_factory.js'
import { SubscribeFactory } from './subscribe_factory.js'


export const InvestmentPlanFactory = factory
  .define(InvestmentPlan, async ({ faker }) => {
    return {
      name: faker.word.sample(),
      amount: faker.number.int({ min: 0, max: 10000 }),
      incomePercentage: faker.number.int({ min: 0, max: 100 }),
      durationInMonth: faker.number.int({ min: 0, max: 100 }),
      durationInDay: faker.number.int({ min: 0, max: 100 }),
      minimumWithdrawalAmount: faker.number.int({ min: 0, max: 100 }),
      vehicleId:faker.number.int({min:1,max:10})

    }
  })
    .relation('subscribes', () => SubscribeFactory)
  .build()
