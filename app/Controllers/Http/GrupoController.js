'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Grupo = use('App/Models/Grupo');

const { validate } = use('Validator');

class GrupoController {
    constructor() {

        //Model instance
        this.model = Grupo;
        
        //Form rules
        this.rules = {
          descricao: 'string|required',
        }
    }

    /**
     * Show a list of all grupos.
     * GET grupos
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
    */
    async index ({ request, response, view }) {
        // return await this.model.all();
        return await this.model.query().with('entidades.acessos').fetch();
    }

    /**
     * Create/save a new grupo.
     * POST grupo
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
     * Display a single grupo.
     * GET grupos/:id
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
     * Update grupo details.
     * PUT or PATCH grupos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async update ({ params, request, response }) {
        //Grupo model instance
        const grupo = await this.model.find(params.id);

        if(grupo && grupo.toJSON() && Object.keys(request.all()).length > 0) {
            //Executa a validação do formulário
            const validation = await validate(request.all(), {
                descricao: 'string'
            });

            //Checa se o formulário está inválido e retorna um erro
            if(validation.fails()) {
                return await response.status(500).json(validation.messages());
            }

            grupo.merge(request.all());
            
            await grupo.save();

            return await this.model.find(params.id);
        } else {
            return await response.status(404).json({
                message: 'Grupo not found'
            });
        }
    }
    
    /**
     * Delete a grupo with id.
     * DELETE grupos/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async destroy ({ params, request, response }) {
        const grupo = await this.model.find(params.id); 
        if(grupo) {
            return await grupo.delete();
        } else {
            return await response.status(404).json({
                message: 'Grupo not found'
            });
        }
    }

}

module.exports = GrupoController