'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrupoEntidadeAcessoSchema extends Schema {
  up () {
    this.create('grupo_entidade_acessos', (table) => {
      table.increments()
      table.integer('grupo_id').unsigned().references('id').inTable('grupos')
      table.integer('entidade_id').unsigned().references('id').inTable('entidades')
      table.integer('acesso_id').unsigned().references('id').inTable('acessos')
      table.timestamps()
    })
  }

  down () {
    this.drop('grupo_entidade_acessos')
  }
}

module.exports = GrupoEntidadeAcessoSchema
