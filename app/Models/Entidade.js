'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entidade extends Model {
    acessos() {
        return this.belongsToMany(
            'App/Models/Acesso'
        )
        .pivotTable('grupo_entidade_acessos');
    }
}

module.exports = Entidade
