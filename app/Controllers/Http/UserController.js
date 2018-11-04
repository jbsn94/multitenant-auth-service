'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const { validate } = use('Validator');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  constructor() {

    //Model instance
    this.model = User;
    
    //Form rules
    this.rules = {
      username: 'string|required',
      email: 'string|required',
      password: 'string|required',
    }
  }
  /**
   * Show a list of all users.
   * GET users
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
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    //Executa a validação do formulário
    const validation = await validate(request.all(), this.rules);

    //Checa se o formulário está inválido e retorna um erro
    if(validation.fails()) {
      return response.status(500).json(validation.messages());
    }

    return await this.model.create(request.all());
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return await this.model.find(params.id);
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    //User model instance
    const user = await this.model.find(params.id);

    if(user && user.toJSON() && Object.keys(request.all()).length > 0) {
      //Executa a validação do formulário
      const validation = await validate(request.all(), {
        username: 'string',
        email: 'string',
        password: 'string'
      });

      //Checa se o formulário está inválido e retorna um erro
      if(validation.fails()) {
        return await response.status(500).json(validation.messages());
      }

      user.merge(request.all());
      
      await user.save();

      return await this.model.find(params.id);
    } else {
      return await response.status(404).json({
        message: 'User not found'
      });
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = await this.model.find(params.id); 
    if(user) {
      return await user.delete();
    } else {
      return await response.status(404).json({
        message: 'User not found'
      });
    }
  }
}

module.exports = UserController
