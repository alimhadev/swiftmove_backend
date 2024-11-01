import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscribes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('last_activity').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_activity')
    })
  }
}
