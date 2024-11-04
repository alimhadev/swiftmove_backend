import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Subscribe from '#models/subscribe'
import User from '#models/user'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'

export default class Increase extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare amount: number

  @column()
  declare subscribeId: number

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime


  @column.dateTime()
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Subscribe)
  declare subscribe: BelongsTo<typeof Subscribe>


  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' }) //
  declare updated:  BelongsTo<typeof User>
}
