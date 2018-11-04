'use strict'
const { execSync, spawnSync } = require('child_process')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Database')} */
const Database = use('Database')

class Tenant extends Model {
    static boot () {
        super.boot();
        
        this.addHook('afterCreate', async (tenantInstance) => {
            
            //Creating new database
            await Database.raw(`create database ${tenantInstance.strid};`);
            
            //Change database config
            Config.set('database.connection', 'tenant');
            Config.set('database.tenant.connection.database', tenantInstance.strid);

            //Running database migrations
            await execSync('adonis migration:run', {
                env: {
                    DB_CONNECTION: 'tenant',
                    DB_DATABASE: tenantInstance.strid
                }
            });

            //Create admin tenant user
            await User.create({
                username: 'admin',
                email: tenantInstance.admin_email,
                password: 'admin'
            });
            
            //Rollback connection config
            Config.set('database.connection', 'admin');
            Config.set('database.tenant.connection.database', '');
        });
    }
}

module.exports = Tenant
