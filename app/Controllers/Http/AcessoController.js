'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Acesso = use('App/Models/Acesso');

const { validate } = use('Validator');

class AcessoController {
    constructor() {

        //Model instance
        this.model = Acesso;
        
        //Form rules
        this.rules = {
          descricao: 'string|required',
        }
    }

    /**
     * Show a list of all acessos.
     * GET acessos
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
     * Create/save a new acesso.
     * POST acesso
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
     * Display a single acesso.
     * GET acessos/:id
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
     * Update acesso details.
     * PUT or PATCH acessos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async update ({ params, request, response }) {
        //Acesso model instance
        const acesso = await this.model.find(params.id);

        if(acesso && acesso.toJSON() && Object.keys(request.all()).length > 0) {
            //Executa a validação do formulário
            const validation = await validate(request.all(), {
                descricao: 'string'
            });

            //Checa se o formulário está inválido e retorna um erro
            if(validation.fails()) {
                return await response.status(500).json(validation.messages());
            }

            acesso.merge(request.all());
            
            await acesso.save();

            return await this.model.find(params.id);
        } else {
            return await response.status(404).json({
                message: 'Acesso not found'
            });
        }
    }
    
    /**
     * Delete a acesso with id.
     * DELETE acessos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async destroy ({ params, request, response }) {
        const acesso = await this.model.find(params.id); 
        if(acesso) {
            return await acesso.delete();
        } else {
            return await response.status(404).json({
                message: 'Acesso not found'
            });
        }
    }

}

module.exports = AcessoController