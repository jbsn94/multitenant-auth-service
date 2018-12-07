'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class UserSeeder {
  async run () {
    let user = {
      username: 'admin',
      email: 'admin@admin.com.br',
      password: 'admin',
    };
    if(Config.get('database.connection') === 'tenant') {
      user = {
        username: 'tenant',
        email: 'tenant@admin.com.br',
        password: 'tenant',
      }
    }
    await User.create(user);
  }
}

module.exports = UserSeeder
