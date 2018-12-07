'use strict'

/*
|--------------------------------------------------------------------------
| AcessoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Acesso = use('App/Models/Acesso');
/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class AcessoSeeder {
  async run () {
    if(Config.get('database.connection') === 'tenant') {
      await Acesso.createMany([{
        descricao: 'index'
      }, {
        descricao: 'show'
      },{
        descricao: 'store'
      },{
        descricao: 'update'
      },{
        descricao: 'delete'
      }]);
    }
  }
}

module.exports = AcessoSeeder
