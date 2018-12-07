# Serviço de autenticação

Este projeto é um serviço de autenticação, autorização e controle de acessos de usuários
em uma arquitetura multi-tenancy.

## Requisitos

1. Node 8.12.0
2. AdonisJs 4.1
3. Banco de dados PostgreSQL

## Setup

Atenção: Antes de realizar os comandos abaixo configure o arquivo **.env** como o **.env.exemple** configurando as conexões do banco bem como criando o banco de dados com o nome **admin** para serem criadas as tabelas pelas migrations e populado pelos seeds.

1. Instalar os pacotes do NPM do projeto
    ```bash
    npm install
    ```
2. Rodar as migrations bases para o banco administrador
    ```bash
    adonis migration:run
    ```
3. Popular o banco com o dados básicos
    ```bash
    adonis seed
    ```

### Fontes

1. [AdonisJs](https://adonisjs.com/)
2. [Node](https://nodejs.org/en/)