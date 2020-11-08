# RESTfulWebServicesNodeExpress
https://app.pluralsight.com/library/courses/node-js-express-rest-web-services-update/table-of-contents


## REST
cliente envia request para server e server responde ao cliente

#### npm init

#### npm install express@4.16.4

adicinar tooling como eslint para garantir qualidade do codigo
nodemon para controlar alteraçoes automatico

#### npm i eslint@5.16.0 -D 
inserir script para lint
#### npm run lint -- --init
```
How would you like to configure ESLint? Use a popular style guide
Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
Do you use React? No
 What format do you want your config file to be in? JavaScript
```

validar codigo
#### npm run lint

faz sumir erros bobos de tab espaço etc
#### ./node_modules/.bin/eslint app.js --fix

controlar alteraçoes codigo
#### npm install nodemon@1.18.5

adicinar script no package.json
```
scripts": {
    "lint": "eslint .",
    "start": "nodemon app.js",
    "test": "mocha tests/**/*Test.js"
  },
  ...,
  "nodemonConfig": {
    "restartable": "rs",
    "ignore": [
      "node_modules/**/node_modules"
    ],
    "delay": "2500",
    "env": {
      "NODE_ENV": "development",
      "PORT": 4000
    }
```

//run
#### npm start

instalar mongodb, adicionar bin no path variavel de ambiente
no cmd adicionar o caminho db e log
#### mongod –dbpath=C:\MongoDB\Server\4.4\data\db –logpath=C:\MongoDB\Server\4.4\data\db\log.txt –install

usar git bash na pasta do projeto
importar dados livros no mongoDB, criar a lista de objetos json
rodar o comando abaixo ira importar as tabelas automatico no mongodb 
#### mongo bookAPI < booksJson.js

#### npm install mongoose@5.3.10

## POST data wth body-parser
#### npm install body-parser@1.18.3

## teste com POSTMAN
### GET 
insira a url: http://localhost:4000/api/books
### POST 
insira a url: http://localhost:4000/api/books
seleciona aba Body, raw, mude text para json, cole exemplo de livro sem id
```
{
    "read": false,
    "title": "Jon's Book",
    "genre": "Fiction",
    "author": "Jon Mills"
}
```
clique Send

### PUT
insira url com id http://localhost:4000/api/books/5f760f23edf375095c95f200
selecione aba body, marque opcao raw, mude text para json 
```
{
    "read": false,
    "title": "Jon's New Book",
    "genre": "Fiction",
    "author": "Jon Mills",
    "__v": 0
}
```

### PATCH (atualiza somente o que informar no id)
nao deixa fazer update no id
insira url com id http://localhost:4000/api/books/5f760f23edf375095c95f200
selecione aba body, marque opcao raw, mude text para json 
```{"read":true}```

## TESTE UNITARIO
#### npm install -D mocha@5.2.0 should@13.2.3 sinon@7.2.2

adicionar no .eslintrc.js para sumir erros
``` "env": {"node": true, "mocha": true}``` 

para rodar testes criados inserir package.json
#### "test": "mocha tests/**/*Test.js"

#### npm test

## TESTE de INTEGRAÇAO
#### npm install supertest@3.3.0 -D
