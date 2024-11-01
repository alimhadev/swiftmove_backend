import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  
  protected tableName_2 = 'withdrawals'

  async up() {

    this.schema.alterTable(this.tableName_2, (table) => {
      table.boolean('is_validated').defaultTo(false)
        })
  }

  async down() {

    this.schema.alterTable(this.tableName_2, (table) => {
      table.dropColumn('is_validated')
    })
  }
}
