'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

class TenantsSchema extends Schema {
  up () {
    if(Env.get('APP_TENANT') === 'admin') {
      this.create('tenants', (table) => {
        table.string('name', 255)
        table.string('strid', 255)
        table.increments()
        table.timestamps()
      })
    }
  }

  down () {
    if(Env.get('APP_TENANT') === 'admin') {
      this.drop('tenants')
    }
  }
}

module.exports = TenantsSchema
