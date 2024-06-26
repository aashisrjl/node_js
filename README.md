> # My First Node Js Project
 ***
# Project Initialization and Setup

- Initialize the project: `npm init`
- Run the application: `npm run app.js`
- Install Express framework: `npm install express`
- Install nodemon globally for automatic server restarts: `npm install -g nodemon` or `node --watch app.js`

## Understanding Module Systems

- CommonJS (CJS) syntax: `require()`, `module.exports`
- ECMAScript (ES) syntax: `import`, `export default`, `export`

## HTTP Methods (Verbs)

- GET
- POST
- PATCH
- DELETE

## Templating Engine

We use EJS (Embedded JavaScript) for rendering frontend through backend.

## EJS Dynamic Expression

To perform dynamic operations in EJS, you can use `<%- 1+1 %>`.

## Setup ejs in node project
> app.set("view engine","ejs );

set this in app.js

## setup css file in node project

**create a css folder inside a public folder and enter**
 > app.use(express.static("public/css"));

**after this we have access of css file in our node project**

## install [ORM](https://www.npmjs.com/package/orm) from npm (sequelize)
 it uses for backend database connnection in sql(where we use ORM instead of sql queries)
 - ORM (sql),sequelize
 - ODM (noSql), Mongoose
> npm install orm
### for sequelize
> npm install sequelize

## Types of file , folder and variable names(convensition)
- lowercase  ->  aashishrijal
- camelCase  -> aashishRijal
- PascalCase -> AashishRijal
- snake_case -> aashish_rijal
- kebab-case -> aashish-rijal

## To interact with database  and access the req.body we need a function
> app.use(express.urlencoded({expanded:true}));
## for frontend use (react,next)
>app.use(express.json());

## Password secure
- hashing
    one way - can't decrypte the data once it change always change 
- encryption
    two way - if we encrypte the data then we also can decrypt this in original form 




