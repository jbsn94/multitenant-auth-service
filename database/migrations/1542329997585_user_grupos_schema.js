'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGruposSchema extends Schema {
  up () {
    this.create('user_grupos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('grupo_id').unsigned().references('id').inTable('grupos')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_grupos')
  }
}

module.exports = UserGruposSchema
