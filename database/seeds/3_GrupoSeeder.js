'use strict'

/*
|--------------------------------------------------------------------------
| GrupoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Grupo = use('App/Models/Grupo');
/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class GrupoSeeder {
  async run () {
    if(Config.get('database.connection') === 'tenant') {
      await Grupo.create({
        descricao: 'Admin'
      });
    }
  }
}

module.exports = GrupoSeeder
