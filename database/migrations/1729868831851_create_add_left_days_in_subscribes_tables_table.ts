import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscribes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('left_days').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('left_days')
    })
  }
}
