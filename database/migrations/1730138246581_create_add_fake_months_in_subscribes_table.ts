import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscribes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('fake_months').defaultTo(30)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fake_months')
    })
  }
}
