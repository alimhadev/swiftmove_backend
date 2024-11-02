import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscribes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('subscription_date_time')
    })
  }

  async down() {

  }

}
