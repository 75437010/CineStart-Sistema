const express = require('express');
const EntradasController = require('../controllers/entradas');

const router = express.Router();

//RUTAS PARA ENTRADA
router.get('/entradas/list', EntradasController.listar); //pagina de la lista
router.get('/entradas/form/:id', EntradasController.form); //pagina del registro cambiamos "0" por ":id"
router.post('/entradas/save', EntradasController.save); //opcion del guardado

module.exports = router;
