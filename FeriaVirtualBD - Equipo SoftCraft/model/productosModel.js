let dbconfig = require("./dbconfig");
let {MongoClient} = require("mongodb");
let ObjectId = require("mongodb").ObjectId;
let mongodb = new MongoClient(dbconfig.connectionString);

const create = async(producto) => {
    console.log("datosModelo",producto);
    let connection = await mongodb.connect();
    let tablaProductos = await connection.db("FeriaVirtual").collection("Productos");
    producto._id = new ObjectId().toString();
    console.log(producto);
    let respuesta = await tablaProductos.insertOne(producto);
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
        let tablaProductos = await connection.db("FeriaVirtual").collection("Productos");
        let Productos = await tablaProductos.find().toArray();
        connection.close();

        return Productos;
    }

    this.readById = async function(id){

        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("FeriaVirtual").collection("Productos");
        let Productos = await tablaProductos.find().toArray();
        connection.close();

        let encontrados = Productos.filter(p => p._id == id);

        if(encontrados.length == 0){
            return null;
        }
        return encontrados[0];
    }

    this.create = async function (producto) {

        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("FeriaVirtual").collection("Productos");
        producto._id = new ObjectId().toString();
        let respuesta = await tablaProductos.insertOne(producto);
        connection.close();

        return respuesta;
    }

    this.update = async function (producto) {
        

        /*
        let productoEncontrado = null;

        for (let prod of Productos) {
            if (prod._id == producto._id) {
                productoEncontrado = prod;
                break;
            }
        }

        if (productoEncontrado != null) {
            productoEncontrado.nombre = nombre;
            productoEncontrado.categoria = categoria;
            productoEncontrado.precio = precio;
            productoEncontrado.cantidad = cantidad;
            productoEncontrado.imagen = imagen;
            response.send({ message: "¡Producto Actualizado!" });
        } else {
            response.send({ message: "No se pudo actualizar el producto" });
        }

        response({ message: "Ok" });*/

        /*

        let connection = await mongodb.connect();
        let tablaProductos = await connection.db("FeriaVirtual").collection("Productos");
        let respuesta = await tablaProductos.updateOne({_id: producto._id}, 
            {$set: {nombre: producto.nombre,
            categoria: producto.categoria,
            cantidad: producto.cantidad,
            precio: producto.precio,
        } });

        connection.close();
        return respuesta;
    }

} */