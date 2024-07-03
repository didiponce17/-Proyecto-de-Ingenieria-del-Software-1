
let {Router} = require('express');
let fs = require('fs');

let TarjetasModel = require("../model/TarjetasModel");

module.exports = function(app){

	// instanciar el modelo
	let model = new TarjetasModel();

	app.get("/api/listardatos", async function(request, response){

		// invocar el modelo
		let listaDatos = await model.read();

		response.send(listaDatos);
	});

	app.post("/api/guardardatos", async function(request, response){
    let { number, name, expiration, cvc } = request.body;

    expiration = expiration.toString();

    let nuevoDato = {
        _id: "",
        number: number,
        name: name,
        expiration: expiration,
        cvc: parseInt(cvc)
    };

    let resultadoInsert = await model.create(nuevoDato);

    let mensaje = "Datos NO guardados!!";
    if(resultadoInsert.acknowledged){
        mensaje = "Datos guardados!!";
    }

    response.send({message: mensaje});
});

}