import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo, hasMany} from '@adonisjs/lucid/orm'
import Subscribe from '#models/subscribe'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Vehicle from '#models/vehicle'
import User from '#models/user'

export default class InvestmentPlan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare amount: number

  @column()
  declare incomePercentage: number

  @column()
  declare durationInMonth: number

  @column()
  declare durationInDay: number

  @column()
  declare minimumWithdrawalAmount: number

  @column()
  declare vehicleId : number

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relatoinship

  @hasMany(() => Subscribe)
  declare subscribes:HasMany<typeof Subscribe>

  @belongsTo(() => Vehicle)
  declare vehicle: BelongsTo<typeof Vehicle>


  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' }) //
  declare updated:  BelongsTo<typeof User>

}
