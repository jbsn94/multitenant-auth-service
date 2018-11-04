'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class TenantsSchema extends Schema {
  up () {
    if(Config.get('database.connection') === 'admin') {
      this.create('tenants', (table) => {
        table.increments()
        table.string('name', 255)
        table.string('admin_email', 255).notNullable()
        table.string('strid', 50).notNullable().unique()
        table.boolean('active')
        table.timestamps()
      })
    }
  }

  down () {
    if(Config.get('database.connection') === 'admin') {
      this.drop('tenants')
    }
  }
}

module.exports = TenantsSchema
