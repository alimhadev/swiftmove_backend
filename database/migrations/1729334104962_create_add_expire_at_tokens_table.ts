import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('expires_at').notNullable
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
    table.dropColumn('expires_at')
    })
  }
}
