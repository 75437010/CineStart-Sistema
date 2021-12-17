'use strict'

var client = require("../database/db");
var db = client.db("cinestar"); // cambiar el nombre por el del cine

var controller = {
  listar: function (req, res) {
    console.log("-----------------------");
    console.log("ENTRANDO A LA FUNCION LISTAR");
    
    db.collection("entradas").find().toArray().then(
        entradas => {
            res.render('entradas_list', { dataEntradas: entradas });
        }
      ).catch(
          error => console.error(error)
      );
  },
  form: function (req, res) {
    console.log("-----------------------");
    console.log("ENTRANDO A LA FUNCION FORM");
    console.log("id:"+req.params.id); // COMPROBAR SI FUNCIONA
    if (req.params.id == 0) { // Si va por acá, es un boleto nuevo
      var entradas = {}
      entradas.idCliente = 0;
      entradas.nombApellido = "";
      entradas.dni = "";
      entradas.edad = "";
      entradas.nombPelicula = "";
      entradas.horario = "";
      entradas.fecha = "";
      res.render('entradas_form', { entradasForm: entradas });
    } else { // El boleto ya existe
      db.collection("entradas").find({idCliente: parseInt(req.params.id)}).toArray().then( //funcion para encontrar el dato
        entradasEncontrado => {
          console.log(entradasEncontrado[0]);
          res.render('entradas_form',{entradasForm:entradasEncontrado[0]})
        }
      ).catch (
        error => console.log(error)
      )
    }
  },
  save:function(req,res) { //Metodo para GUARDAR
    console.log("-----------------------");
    console.log("ENTRANDO A LA FUNCION GUARDAR");

    if (req.body.idCliente == 0) { 
      db.collection("entradas").count().then(
        countEntradas => {
          var entradas = {}
          entradas.idCliente = countEntradas + 1; // INCREMENTO EN 1
          entradas.nombApellido = req.body.nombApellido;
          entradas.dni = req.body.dni;
          entradas.edad = req.body.edad;
          entradas.nombPelicula = req.body.nombPelicula;
          entradas.horario = req.body.horario;
          entradas.fecha = req.body.fecha;
          console.log(entradas);
          db.collection("entradas").insertOne(entradas).then(
            ()=>{
              res.redirect('/entradas/list'); // REGRESAR LISTAR
            }
          ).catch(
            error => console.error(error)
          );
        }
      );
    } else { // EDITAR
      console.log('EDITANDO...');
      var entradas = {}
      entradas.idCliente = parseInt(req.body.idCliente);
      entradas.nombApellido = req.body.nombApellido;
      entradas.dni = req.body.dni;
      entradas.edad = req.body.edad;
      entradas.nombPelicula = req.body.nombPelicula;
      entradas.horario = req.body.horario;
      entradas.fecha = req.body.fecha;
      console.log(entradas);
      db.collection("entradas").updateOne({idCliente:{$eq:parseInt(req.body.idCliente)}},
                                            {$set:entradas}
      )
      .then(
        () => {
          res.redirect('/entradas/list');
        }
      ).catch(
        error => console.log(error)
      );
    }
    
  }
}

module.exports = controller;