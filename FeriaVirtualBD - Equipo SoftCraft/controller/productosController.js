//let fs = require('fs');
let modeloProductos = require("../model/ProductosModel");

module.exports = function (app) {

    app.get("/api/listaProductos", async function (request, response) {
        try {
            //Me traje esto para acá, pero estaba en el API de guardarProducto.
            let listaProductos = await modeloProductos.read();

            response.send(listaProductos);
        } catch (error) { console.log(error) }
    });

    //FUNCIÓN PARA RECOGER LOS DATOS DEL PRODUCTO REGISTRADO Y GUARDARLOS AQUÍ
    app.post("/api/guardarProducto", async function (request, response) {
        try {
            //let listaProductos = modeloProductos.read();

            //let nombre = request.body.nombre;
            let { nombre, categoria, precio, inventario, imagen } = request.body;

            let nuevoProducto = {
                nombre,
                categoria,
                precio,
                inventario,
                imagen
            };

            let resultadoInsert = await modeloProductos.create(nuevoProducto);

            let mensaje = "¡Producto no agregado!";
            if (resultadoInsert.acknowledged) {
                mensaje = "Producto guardado";
            }

            /*Me llevé esto para el productosModel.js
            listaProductos.push(nuevoProducto); */

            response.send({ message: "¡Producto guardado!" });
        } catch (error) { console.log(error) }
    });

    //FUNCIÓN PARA ACTUALIZAR LOS DATOS DEL PRODUCTO REGISTRADO Y GUARDARLOS AQUÍ
    app.post("/api/actualizarProducto", async function (request, response) {

        try {
            //Vamos a recoger los datos que ya están en producto.
            let { _id, nombre, categoria, precio, cantidad } = request.body;

            let productoEditado = {
                _id: _id,
                nombre: nombre,
                precio: parseFloat(precio),
                cantidad: parseInt(cantidad),
                //imagen
                categoria: categoria
            };
            
            let resultadoUpdate = await model.update(productoEditado);

            let mensaje = "Producto no actualizado";
            if (resultadoUpdate.matchedCount >= 1) {
                mensaje = "Producto no actualizado";
            }

            response.send({ message: mensaje });

        }catch (error) { console.log(error) }
    });

}


//Aparentemente hay que traerse acá una función para actualizar la imagen




