//let fs = require('fs');
let modeloClientes = require("../Model/clientesModel");

module.exports = function (app) {

    app.get("/api/listaClientes", async function (request, response) {
        try {
            
            let listaClientes = await modeloClientes.read();

            response.send(listaClientes);
        } catch (error) { console.log(error) }
    });

    app.post("/api/guardarClientes", async function (request, response) {
        try { 


            let _id = request.body._id;
            let nombre = request.body.nombre;
            let primerApellido = request.body.primerApellido;
            let segundoApellido = request.body.segundoApellido;
            let correo = request.body.correo;


            //let { _id, nombre, primerApellido, segundoApellido, correo } = request.body;
            //INVOCAR EL MODELO
            let nuevoCliente = {
                _id: _id,
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correo: correo
            };
            console.log(nuevoCliente);
            let resultadoInsert = await modeloClientes.create(nuevoCliente);

            let mensaje = "¡Usuario no registrado!";
            if (resultadoInsert.acknowledged) {
                mensaje = "¡Bienvenido a Feria Virtual!";
            }


            response.send({ message: "¡Bienvenido a Feria Virtual!" });
        } catch (error) { console.log(error) }
    });

    //FUNCIÓN PARA ACTUALIZAR LOS DATOS DEL CLIENTE REGISTRADO Y GUARDARLOS AQUÍ
    app.post("/api/actualizarCliente", async function (request, response) {

        try {
            //Vamos a recoger los datos que ya están en cliente.
            let { _id, nombre, primerApellido, segundoApellido, correo } = request.body;

            let clienteEditado = {
                _id: _id,
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correo: correo
            };
            
            let resultadoUpdate = await model.update(clienteEditado);

            let mensaje = "¡Cambios Guardados!";
            if (resultadoUpdate.matchedCount >= 1) {
                mensaje = "Lo sentimos. No se pudieron actualizar sus datos";
            }

            response.send({ message: mensaje });

        }catch (error) { console.log(error) }
    });

}




