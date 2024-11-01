import { DateTime } from 'luxon'
import User from '#models/user'
import Increase from '#models/increase'
import { BaseModel, column, belongsTo,hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import InvestmentPlan from '#models/investment_plan'
import Reactivation from '#models/reactivation'

export default class Subscribe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare state: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare lastActivity: DateTime | null

  @column()
  declare leftDays: number

  @column()
  declare fakeMonths: number

  @column()
  declare userId: number

  @column()
  declare investmentPlanId: number

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => InvestmentPlan)
  declare investmentPlan: BelongsTo<typeof InvestmentPlan>

  @hasMany(() => Increase)
  declare increases: HasMany<typeof Increase>

  @hasMany(() =>Reactivation)
  declare reactivations: HasMany<typeof Reactivation>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' }) //
  declare updated:  BelongsTo<typeof User>

}
