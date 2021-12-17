const express = require('express');
const ProductosController = require('../controllers/productos');

const router = express.Router();

//RUTAS PARA ENTRADA
router.get('/productos/list', ProductosController.listar); //pagina de la lista
router.get('/productos/form/:id', ProductosController.form); //pagina del registro cambiamos "0" por ":id"
router.post('/productos/save', ProductosController.save); //opcion del guardado

module.exports = router; 