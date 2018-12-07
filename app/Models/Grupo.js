'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Grupo extends Model {
    entidades() {
        return this.belongsToMany(
            'App/Models/Entidade'
        )
        .pivotTable('grupo_entidade_acessos');
    }
}

module.exports = Grupo
