'use strict'

/*
|--------------------------------------------------------------------------
| UserGrupoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserGrupo = use('App/Models/UserGrupo');
/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class UserGrupoSeeder {
  async run () {
    if(Config.get('database.connection') === 'tenant') {
      await UserGrupo.create({
        user_id: 1,
        grupo_id: 1
      });
    }
  }
}

module.exports = UserGrupoSeeder
