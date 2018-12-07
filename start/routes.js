'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
    Route.post('login', 'AuthController.login');
    
    Route.resource('tenant', 'TenantController').apiOnly().middleware(['auth']);
    Route.resource('user', 'UserController').apiOnly().middleware(['auth']);
    Route.resource('grupo', 'GrupoController').apiOnly().middleware(['auth']);
    Route.resource('acesso', 'AcessoController').apiOnly().middleware(['auth']);
    Route.resource('entidade', 'EntidadeController').apiOnly().middleware(['auth']);
})
.prefix('admin/api');

Route.group(() => {
    Route.post('login', 'AuthController.login');
    
    Route.resource('user', 'UserController').apiOnly().middleware(['auth']);
    Route.resource('grupo', 'GrupoController').apiOnly().middleware(['auth']);
    Route.resource('acesso', 'AcessoController').apiOnly().middleware(['auth']);
    Route.resource('entidade', 'EntidadeController').apiOnly().middleware(['auth']);
})
.prefix(':nomecliente/api')
.middleware(['dbSwitch']);