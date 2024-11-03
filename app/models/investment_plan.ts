import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo, hasMany} from '@adonisjs/lucid/orm'
import Subscribe from '#models/subscribe'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Vehicle from '#models/vehicle'
import User from '#models/user'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'

export default class InvestmentPlan extends compose(BaseModel, SoftDeletes) {
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

  @column.dateTime({ columnName: 'deletedAt' })
  declare deletedAt: DateTime | null
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
