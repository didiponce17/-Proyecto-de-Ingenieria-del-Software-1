let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient(dbconfig.connectionString);

const create = async(cliente) => {
    console.log("datosModelo",cliente);
    let connection = await mongodb.connect();
    let tablaClientes = await connection.db("FeriaVirtual").collection("Clientes");
    cliente._id = new ObjectId().toString();
    console.log(cliente);
    let respuesta = await tablaClientes.insertOne(cliente);
    console.log(respuesta);
    connection.close();

    return respuesta;
}

module.exports = {
    create
}

/*
module.exports = function () {

    this.read = async function () {

        let connection = await mongodb.connect();
        let tablaClientes = await connection.db("FeriaVirtual").collection("Clientes");
        let Clientes = await tablaClientes.find().toArray();
        connection.close();

        return Clientes;
    }

    this.readById = async function(id){

        let connection = await mongodb.connect();
        let tablaClientes = await connection.db("FeriaVirtual").collection("Clientes");
        let Clientes = await tablaClientes.find().toArray();
        connection.close();

        let encontrados = Clientes.filter(c => c._id == id);

        if(encontrados.length == 0){
            return null;
        }
        return encontrados[0];
    }

   

    this.create = async function (cliente) {

        let connection = await mongodb.connect();
        let tablaClientes = await connection.db("FeriaVirtual").collection("Clientes");
        cliente._id = new ObjectId().toString();
        console.log(cliente);
        let respuesta = await tablaClientes.insertOne(cliente);
        console.log(respuesta);
        connection.close();

        return respuesta;
    }

    this.update = async function (cliente) {
        
        let connection = await mongodb.connect();
        let tablaClientes = await connection.db("FeriaVirtual").collection("Clientes");
        let respuesta = await tablaClientes.updateOne({_id: cliente._id}, 
            {$set: {nombre: cliente.nombre,
                primerApellido: cliente.primerApellido,
                segundoApellido: cliente.segundoApellido,
                correo: cliente.correo
        } });

        connection.close();
        return respuesta;
    }

} */