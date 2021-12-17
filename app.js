'use strict'

//REQUIRES
var express = require('express');

// CARGAR ARCHIVOS DE RUTAS
var inicio_routes = require('./routes/inicio'); //INICIALIZAMOS LA RUTA DE LA PAGINA
var entradas_routes = require('./routes/entradas');
var productos_routes = require('./routes/productos'); 

//EJECUTAR EXPRESS
var app = express();

//ASIGNO EJS A LAS VISTAS
app.set("view engine", "ejs");

//DECODIFICACION DE ENVIOS FORM
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//REESCRIBIR RUTAS
app.use('/',entradas_routes);
app.use('/',productos_routes);
app.use('/',require('./routes/inicio')); //RUTA DE LA PAGINA DE INICIO
app.use('/', require('./routes/sesion')); //RUTA A LA PAGINA DE SESISON

//EXPORTAR MODULE
module.exports = app;
