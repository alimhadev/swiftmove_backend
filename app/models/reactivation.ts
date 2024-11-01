import  Subscribe  from '#models/subscribe';
import User  from '#models/user';
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import  type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Reactivation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare subscribeId: number

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Subscribe)
  declare subscribe: BelongsTo<typeof Subscribe>


  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' }) //
  declare updated:  BelongsTo<typeof User>
}
