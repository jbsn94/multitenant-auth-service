'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tenant = use('App/Models/Tenant')

/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

class DbSwitch {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    //Setting default connection
    Config.set('database.connection', 'admin');
    
    //Find tenant
    const tenant = await Tenant.findBy('name', request.params.clientesigla);
    
    //Check if tenant exists
    if(tenant) {
      
      //Change database connection configs
      Config.set('database.connection', 'tenant');
      Config.set('database.tenant.connection.database', tenant.$attributes.strid);
      
      //Pass request
      await next();

    } else {
      //Return error if tenant do not exists
      await response.status(404).json({
        message: 'Cliente not found'
      });
    }

  }
}

module.exports = DbSwitch
