
import User from '#models/user'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'

export default class Deposit extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number

  @column()
  declare method: string

  @column()
  declare state: string

  @column()
  declare userId : number

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column()
  declare photo: string | null

  @column()
  declare isValidated: boolean

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

  @belongsTo(() => User, { foreignKey: 'updatedBy' })
  declare updated:  BelongsTo<typeof User>
}
