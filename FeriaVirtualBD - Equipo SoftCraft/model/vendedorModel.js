let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient(dbconfig.connectionString);

const create = async(vendedor) => {
    console.log("datosModelo",vendedor);
    let connection = await mongodb.connect();
    let tablaVendedores = await connection.db("FeriaVirtual").collection("Vendedores");
    vendedor._id = new ObjectId().toString();
    console.log(vendedor);
    let respuesta = await tablaVendedores.insertOne(vendedor);
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
        let tablaVendedores = await connection.db("FeriaVirtual").collection("Vendedores");
        let Vendedores = await tablaVendedores.find().toArray();
        connection.close();

        return Vendedores;
    }

    this.readById = async function(id){

        let connection = await mongodb.connect();
        let tablaVendedores = await connection.db("FeriaVirtual").collection("Vendedores");
        let Vendedores = await tablaVendedores.find().toArray();
        connection.close();

        let encontrados = Vendedores.filter(v => v._id == id);

        if(encontrados.length == 0){
            return null;
        }
        return encontrados[0];
    }

    this.create = async function (vendedor) {

        let connection = await mongodb.connect();
        let tablaVendedores = await connection.db("FeriaVirtual").collection("Vendedores");
        vendedor._id = new ObjectId().toString();
        let respuesta = await tablaVendedores.insertOne(vendedor);
        connection.close();

        return respuesta;
    }

    this.update = async function (vendedor) {
        
        let connection = await mongodb.connect();
        let tablaVendedores = await connection.db("FeriaVirtual").collection("Vendedores");
        let respuesta = await tablaVendedores.updateOne({_id: vendedor._id}, 
            {$set: {nombre: vendedor.nombre,
                primerApellido: vendedor.primerApellido,
                segundoApellido: vendedor.segundoApellido,
                correo: vendedor.correo
        } });

        connection.close();
        return respuesta;
    }

}*/