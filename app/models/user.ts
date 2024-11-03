import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany,belongsTo} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Deposit from '#models/deposit'
import Withdrawal from '#models/withdrawal'
import Sponsorship from '#models/sponsorship'
import Subscribe from '#models/subscribe'

import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Vehicle from '#models/vehicle'
import InvestmentPlan from '#models/investment_plan'
import Reactivation from '#models/reactivation'
import Increase from '#models/increase'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'



const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string | null

  @column()
  declare lastname: string | null

  @column()
  declare email: string

  @column()
  declare createdBy : number

  @column()
  declare updatedBy : number

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare avatar: string | null

  @column()
  declare solde: number

  @column()
  declare phoneNumber: string | null

  @column()
  declare isVerified: boolean

  @column()
  declare isAdmin: boolean

  @column()
  declare totalInvestments: number

  @column.dateTime()
  declare tokenExpiresAt: DateTime

  @column()
  declare emailVerificationToken: string | null

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User,{
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  //relationship

  @hasMany(() => Deposit)
 declare deposits: HasMany<typeof Deposit>

  @hasMany(() => Withdrawal)
  declare withdrawals:HasMany<typeof Withdrawal>

  @hasMany(() => Sponsorship)
  declare sponsorships:HasMany<typeof Sponsorship>

  @hasMany(() => Subscribe)
  declare subscribes:HasMany<typeof Subscribe>

  @hasMany(()=>InvestmentPlan )
  declare investmentPlans:HasMany<typeof InvestmentPlan>

  @hasMany(() => Vehicle)
  declare vehicles:HasMany<typeof Vehicle>

  @hasMany(() => User)
  declare users:HasMany<typeof User>

  @hasMany(()=>Reactivation)
  declare reactivations:HasMany<typeof Reactivation>

  @hasMany(()=>Increase)
  declare increases:HasMany<typeof Increase>












  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare created: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'updatedBy' })
  declare updated:  BelongsTo<typeof User>




}
