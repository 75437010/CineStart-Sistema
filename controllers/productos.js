'use strict'

var client = require("../database/db");
var db = client.db("cinestar"); // cambiar el nombre por el del cine

var controller = {
  listar: function (req, res) {
    console.log("-----------------------");
    console.log("ENTRANDO A LA FUNCION LISTAR");
    
    db.collection("productos").find().toArray().then(
        productos => {
            res.render('productos_list', { dataProductos: productos });
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
      var productos = {}
      productos.idProducto = 0;
      productos.nombApellido = "";
      productos.dni = "";
      productos.tipoProducto = "";
      productos.cantidad = "";
      productos.combos = "";
      res.render('productos_form', { productosForm: productos });
    } else { // El boleto ya existe
      db.collection("productos").find({idProducto: parseInt(req.params.id)}).toArray().then( //funcion para encontrar el dato
        productosEncontrado => {
          console.log(productosEncontrado[0]);
          res.render('productos_form',{productosForm:productosEncontrado[0]})
        }
      ).catch (
        error => console.log(error)
      )
    }
  },
  save:function(req,res) { //Metodo para GUARDAR
    console.log("-----------------------");
    console.log("ENTRANDO A LA FUNCION GUARDAR");

    if (req.body.idProducto == 0) { 
      db.collection("productos").count().then(
        countProductos => {
          var productos = {}
          productos.idProducto = countProductos + 1; // INCREMENTO EN 1
          productos.nombApellido = req.body.nombApellido;
          productos.dni = req.body.dni;
          productos.tipoProducto = req.body.tipoProducto;
          productos.cantidad = req.body.cantidad;
          productos.combos = req.body.combos;
          console.log(productos);
          db.collection("productos").insertOne(productos).then(
            ()=>{
              res.redirect('/productos/list'); // REGRESAR LISTAR
            }
          ).catch(
            error => console.error(error)
          );
        }
      );
    } else { // EDITAR
      console.log('EDITANDO...');
      var productos = {}
      productos.idProducto = parseInt(req.body.idProducto);
      productos.nombApellido = req.body.nombApellido;
      productos.dni = req.body.dni;
      productos.tipoProducto = req.body.tipoProducto;
      productos.cantidad = req.body.cantidad;
      productos.combos = req.body.combos;
      console.log(productos);
      db.collection("productos").updateOne({idProducto:{$eq:parseInt(req.body.idProducto)}},
                                            {$set:productos}
      )
      .then(
        () => {
          res.redirect('/productos/list');
        }
      ).catch(
        error => console.log(error)
      );
    }
    
  }
}

module.exports = controller;