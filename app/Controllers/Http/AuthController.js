'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

class AuthController {

    /**
     * Login.
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
    */
    async login({request, response, auth}) {
        const { email, password } = request.all();
        const authResponse = await auth.attempt(email, password);
        const user = await User.findBy('email', email);
        if(user) {
            await Token.create({
                user_id: user.$attributes.id,
                token: authResponse.token,
                type: authResponse.type,
                is_revoked: false
            });
        }
        return authResponse;        
    }   
}

module.exports = AuthController
