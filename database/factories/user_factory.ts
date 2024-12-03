import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DepositFactory } from './deposit_factory.js'
// import { InvestmentPlanFactory } from './investment_plan_factory.js'
import { WithdrawalFactory } from './withdrawal_factory.js'
// import { IncreaseFactory } from './increase_factory.js'
import { SubscribeFactory } from './subscribe_factory.js'
// import { VehicleFactory } from './vehicle_factory.js'

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
  }).relation('deposits', () => DepositFactory)
  .relation('withdrawals', () => WithdrawalFactory)
  // .relation('investmentPlans', () => InvestmentPlanFactory)
  // .relation('increases', () => IncreaseFactory)
  .relation('subscribes', () => SubscribeFactory)
  // .relation('vehicles', () => VehicleFactory)

  .build()
