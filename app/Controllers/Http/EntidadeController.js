'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Entidade = use('App/Models/Entidade');

const { validate } = use('Validator');

class EntidadeController {
    constructor() {

        //Model instance
        this.model = Entidade;
        
        //Form rules
        this.rules = {
          descricao: 'string|required',
        }
    }

    /**
     * Show a list of all entidades.
     * GET entidades
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
    */
    async index ({ request, response, view }) {
        return await this.model.all();
        // return await this.model.query().with('acessos').fetch();
    }

    /**
     * Create/save a new entidade.
     * POST entidade
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
     * Display a single entidade.
     * GET entidades/:id
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
     * Update entidade details.
     * PUT or PATCH entidades/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async update ({ params, request, response }) {
        //Entidade model instance
        const entidade = await this.model.find(params.id);

        if(entidade && entidade.toJSON() && Object.keys(request.all()).length > 0) {
            //Executa a validação do formulário
            const validation = await validate(request.all(), {
                descricao: 'string'
            });

            //Checa se o formulário está inválido e retorna um erro
            if(validation.fails()) {
                return await response.status(500).json(validation.messages());
            }

            entidade.merge(request.all());
            
            await entidade.save();

            return await this.model.find(params.id);
        } else {
            return await response.status(404).json({
                message: 'Entidade not found'
            });
        }
    }
    
    /**
     * Delete a entidade with id.
     * DELETE entidades/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async destroy ({ params, request, response }) {
        const entidade = await this.model.find(params.id); 
        if(entidade) {
            return await entidade.delete();
        } else {
            return await response.status(404).json({
                message: 'Entidade not found'
            });
        }
    }

}

module.exports = EntidadeController
