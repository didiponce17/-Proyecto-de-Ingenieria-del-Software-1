    let dbconfig =require("./dbconfig");
    let{MongoClient} = require("mongodb");
    let ObjectId = require("mongodb").ObjectId;
    let mongodb = new MongoClient(dbconfig.connectionString);

    module.exports = function(){

        this.read = async function(){

            let connection = await mongodb.connect();
            let formulario = await connection.db("FeriaVirtual").collection("Tarjetas");
            let datos = await formulario.find().toArray();
            connection.close();

            return datos;
        }

        this.create = async function(dato){

            let connection = await mongodb.connect();
            let formulario = await connection.db("FeriaVirtual").collection("Tarjetas");
            dato._id = new ObjectId().toString();
            let respuesta = await formulario.insertOne(dato);
            connection.close();

            return respuesta;
        }
    }