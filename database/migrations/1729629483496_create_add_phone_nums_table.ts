import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName_1 = 'deposits'
  protected tableName_2 = 'withdrawals'
  protected tableName_3 = 'users'

  async up() {
    this.schema.alterTable(this.tableName_1, (table) => {
      table.string('photo').notNullable
    })
    this.schema.alterTable(this.tableName_2, (table) => {
      table.string('phone_number').nullable()
    })
    this.schema.alterTable(this.tableName_3, (table) => {
      table.string('phone_number').nullable()
    })

  }

  async down() {

    this.schema.alterTable(this.tableName_1, (table) => {
      table.dropColumn('photo')
    })
    this.schema.alterTable(this.tableName_2, (table) => {
      table.dropColumn('phone_number')
    })
    this.schema.alterTable(this.tableName_3, (table) => {
      table.dropColumn('phone_number')
    })
  }
}
