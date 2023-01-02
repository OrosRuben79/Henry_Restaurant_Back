const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/index');
// const path = require('path');
const cors = require('cors');

const server = express();

//swagger
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerSpec = {
//   definition: {
//     openapi: "3.0.0",
//     info:{
//       title: "Node MorgenDB API",
//       version: "1.0.0",
//     },
//     server:[
//       {
//         url: "http://localhost:3001"
//       },
//     ],
//   },
//   apis: [`${path.join(__dirname, "../../src/")}`]

// }

server.name = 'API';



server.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
server.use(bodyParser.json({ limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
    next();
  });


server.use('/', router)
// server.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
  

module.exports = server;