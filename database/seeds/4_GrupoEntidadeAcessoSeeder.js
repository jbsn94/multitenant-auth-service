'use strict'

/*
|--------------------------------------------------------------------------
| GrupoEntidadeAcessoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const GrupoEntidadeAcesso = use('App/Models/GrupoEntidadeAcesso');
/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class GrupoEntidadeAcessoSeeder {
  async run () {
    if(Config.get('database.connection') === 'tenant') {
      await GrupoEntidadeAcesso.createMany([
        {
          grupo_id: 1,
          entidade_id: 1,
          acesso_id: 1
        },{
          grupo_id: 1,
          entidade_id: 1,
          acesso_id: 2
        },{
          grupo_id: 1,
          entidade_id: 1,
          acesso_id: 3
        },{
          grupo_id: 1,
          entidade_id: 1,
          acesso_id: 4
        },{
          grupo_id: 1,
          entidade_id: 1,
          acesso_id: 5
        }
      ]);
    }
  }
}

module.exports = GrupoEntidadeAcessoSeeder
