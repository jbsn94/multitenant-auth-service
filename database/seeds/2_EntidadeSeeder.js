'use strict'

/*
|--------------------------------------------------------------------------
| EntidadeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Entidade = use('App/Models/Entidade');
/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class EntidadeSeeder {
  async run () {
    if(Config.get('database.connection') === 'tenant') {
      await Entidade.create({
        descricao: 'users'
      });
    }
  }
}

module.exports = EntidadeSeeder
