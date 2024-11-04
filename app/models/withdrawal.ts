
import { DateTime } from 'luxon'
import User from '#models/user'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
export default class Withdrawal extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number

  @column()
  declare method: string

  @column()
  declare cost: number | null

  @column()
  declare isValidated: boolean

  @column()
  declare userId : number

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column()
  declare phoneNumber: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>


  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' }) //
  declare updated:  BelongsTo<typeof User>
}
