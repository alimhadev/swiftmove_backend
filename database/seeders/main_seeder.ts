import { ReactivationFactory } from '#database/factories/reactivation_factory';
import { DepositFactory } from '#database/factories/deposit_factory'
import { IncreaseFactory } from '#database/factories/increase_factory'
import { InvestmentPlanFactory } from '#database/factories/investment_plan_factory'
import { SubscribeFactory } from '#database/factories/subscribe_factory'
import { UserFactory } from '#database/factories/user_factory'
import { VehicleFactory } from '#database/factories/vehicle_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { WithdrawalFactory } from '#database/factories/withdrawal_factory';

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await UserFactory.createMany(15)
    await VehicleFactory.createMany(12)
    await InvestmentPlanFactory.createMany(10)
    await SubscribeFactory.createMany(25)
    await IncreaseFactory.createMany(50)
    await ReactivationFactory.createMany(20)
    await DepositFactory.createMany(40)
    await WithdrawalFactory.createMany(45)

  }
}
