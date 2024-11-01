import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'investment_plans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('name', 255).notNullable()
      table.decimal('amount', 15, 2).notNullable()
      table.float('income_percentage').notNullable()
      table.integer('duration_in_month').notNullable()
      table.integer('duration_in_day').notNullable()
      table.decimal('minimum_withdrawal_amount', 15, 2).notNullable()

      table.integer('vehicle_id').unsigned().references('vehicles.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
