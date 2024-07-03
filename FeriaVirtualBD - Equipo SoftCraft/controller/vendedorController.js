//let fs = require('fs');
let modeloVendedor = require("../Model/vendedorModel");

module.exports = function (app) {

    app.get("/api/listaVendedores", async function (request, response) {
        try {
            
            let listaVendedores = await modeloVendedor.read();

            response.send(listaVendedores);
        } catch (error) { console.log(error) }
    });


    app.post("/api/guardarVendedor", async function (request, response) {
        try {
            console.log(JSON.stringify(request.body))
            let _id = request.body._id;
            let nombre = request.body.nombre;
            let primerApellido = request.body.primerApellido;
            let segundoApellido = request.body.segundoApellido;
            let correo = request.body.correo;
            
            //let { _id, nombre, primerApellido, segundoApellido, correo } = request.body;

            let nuevoVendedor = {
                _id: _id,
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correo: correo
            };

            let resultadoInsert = await modeloVendedor.create(nuevoVendedor);

            let mensaje = "¡El vendedor no se pudo registrar!";
            if (resultadoInsert.acknowledged) {
                mensaje = "¡Su solicitud se envió al administrador!";
            }


            response.send({ message: "¡Bienvenido a Feria Virtual!" });
        } catch (error) { console.log(error) }
    });

    
    app.post("/api/actualizarVendedor", async function (request, response) {

        try {
            //Vamos a recoger los datos que ya están en vendedor.
            let { _id, nombre, primerApellido, segundoApellido, correo } = request.body;

            let vendedorEditado = {
                _id: _id,
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correo: correo
            };
            
            let resultadoUpdate = await model.update(vendedorEditado);

            let mensaje = "¡Cambios Guardados!";
            if (resultadoUpdate.matchedCount >= 1) {
                mensaje = "Lo sentimos. No se pudieron actualizar sus datos";
            }

            response.send({ message: mensaje });

        }catch (error) { console.log(error) }
    });

}




