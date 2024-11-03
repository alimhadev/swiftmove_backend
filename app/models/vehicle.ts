import InvestmentPlan  from '#models/investment_plan';
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user';
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'


export default class Vehicle extends compose(BaseModel, SoftDeletes) {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @hasMany(() => InvestmentPlan)
  declare investmentPlans: HasMany<typeof InvestmentPlan>


  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' }) //
  declare updated:  BelongsTo<typeof User>
}
