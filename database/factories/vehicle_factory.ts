import factory from '@adonisjs/lucid/factories'
import Vehicle from '#models/vehicle'
import { InvestmentPlanFactory } from './investment_plan_factory.js'

export const VehicleFactory = factory
  .define(Vehicle, async ({ faker }) => {
    return {
      name: faker.vehicle.type(),

    }
  }).relation('investmentPlans', () => InvestmentPlanFactory)
  .build()
