import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName_1 = 'deposits'

  protected tableName_2 = 'withdrawals'

  protected tableName_3 = 'reactivations'

  protected tableName_4 = 'users'

  protected tableName_5 = 'subscribes'

  protected tableName_6 = 'increases'

  protected tableName_7 = 'sponsorships'

  protected tableName_8 = 'investment_plans'

  protected tableName_9 = 'vehicles'


  async up() {
    this.schema.alterTable(this.tableName_1, (table) => {
        table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
        table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
    })

    this.schema.alterTable(this.tableName_2, (table) => {
      table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_3, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_4, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_5, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_6, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_7, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_8, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })

  this.schema.alterTable(this.tableName_9, (table) => {
    table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
    table.integer('updated_by').unsigned().references('users.id').onDelete('CASCADE')
  })
  }

  async down() {
    this.schema.alterTable(this.tableName_1, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_2, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_3, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_4, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_5, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_6, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_7, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_8, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })

    this.schema.alterTable(this.tableName_9, (table) => {
      table.dropColumn('created_by')
      table.dropColumn('updated_by')
    })
  }
}
