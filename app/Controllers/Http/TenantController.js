'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tenant = use('App/Models/Tenant');

const { validate } = use('Validator');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tenants
 */
class TenantController {
  constructor() {

    //Model instance
    this.model = Tenant;
    
    //Form rules
    this.rules = {
      name: 'required|string',
      admin_email: 'required|string'
    }
  }
  
  /**
   * Show a list of all tenants.
   * GET tenants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await this.model.all();
  }

  /**
   * Create/save a new tenant.
   * POST tenants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Session} ctx.session
   */
  async store ({ request, response, session }) {
    //Executa a validação do formulário
    const validation = await validate(request.all(), this.rules);
    
    //Checa se o formulário está inválido e retorna um erro
    if(validation.fails()) {
      return response.status(500).json(validation.messages());
    }

    //Cadastra um novo Tenant e retorna
    return await this.model.create(Object.assign({
      strid: request.only(['name'])['name'] + '_' + Math.floor((1 + Math.random()) * 0x10000).toString(16),
      active: false
    }, request.only(['name', 'admin_email'])));
  }

  /**
   * Display a single tenant.
   * GET tenants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return this.model.find(params.id);
  }

  /**
   * Update tenant details.
   * PUT or PATCH tenants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    //User model instance
    const tenant = await this.model.find(params.id);

    if(tenant && tenant.toJSON() && Object.keys(request.all()).length > 0) {
      //Executa a validação do formulário
      const validation = await validate(request.all(), {
        name: 'string',
        admin_email: 'string'
      });

      //Checa se o formulário está inválido e retorna um erro
      if(validation.fails()) {
        return await response.status(500).json(validation.messages());
      }

      tenant.merge(request.all());
      
      await tenant.save();

      return await this.model.find(params.id);
    } else {
      return await response.status(404).json({
        message: 'User not found'
      });
    }
  }

  /**
   * Delete a tenant with id.
   * DELETE tenants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const tenant = await this.model.find(params.id); 
    if(tenant) {
      return await tenant.delete();
    } else {
      return await response.status(404).json({
        message: 'tenant not found'
      });
    }
  }
}

module.exports = TenantController
