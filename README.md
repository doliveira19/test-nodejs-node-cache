# API de cadastro de produtos

## Tecnologias

- Node
- Typescript
- Redis

## Requisitos

- Node
- Redis

## Criar conteiner Redis

docker run --name redis -p 6379:6379 -d redis

## Como usar a API

1. Clonar repositório;
2. Instalar dependências: `$ npm install`;
3. Iniciar Redis (container);
4. Iniciar a aplicação: `$ npm run dev`;

## OBS

É necessário realizar um login simples na aplicação para poder acessar as rotas do CRUD de produtos.
Para isso, foi criada uma rota /auth/login onde devem ser utilizadas as credenciais:
email: 'teste@teste.com.br',
password: 'teste'

Será retornado um token do tipo `Bearer` que deve ser usado no header `Authorization` nas rotas de CRUD de produtos.

## npm scripts

Scripts que podem ser executados com o comando `$ npm run "script-name"`:
* `dev`: Inicia a aplicação;
* `build`: Realiza o build do projeto no diretório `./build`;
* `test`: Executa testes unitários;
* `start`: Executa o projeto depois da build;

## Documentação da api

http://localhost:3000/api-docs
