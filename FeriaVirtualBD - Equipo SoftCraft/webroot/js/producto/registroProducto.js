function inicializarPagina() {
    try {
        var btnRegistrarProducto = document.querySelector("#botonRegistrarProducto");

        btnRegistrarProducto.addEventListener("click", function () {
            console.log("aquí");
            var resultadoValidacionFormulario = validarFormularioProducto();

            if (resultadoValidacionFormulario) {
                enviarFormularioProducto();
            }
        });
        
    } catch (error) { }

    try {
        cargarTablaProductos();
    } catch (error) { }

    try {
        validarEdicion();
    } catch (error) { }
}

function validarFormularioProducto() {
    
    
    var formulario = document.querySelector(".datos-agregarproductovendedor");

    console.log(formulario);

    //Variables que representen los datos de entrada:
    var inputNombre = formulario.querySelector("input[name='NombreProducto']");
    var inputCategoria = formulario.querySelector("input[name='Categoria']");
    var inputPrecio = formulario.querySelector("input[name='Precio']");
    var inputInventario = formulario.querySelector("input[name='Inventario']");

    //Variables que representen los spans de validación de cada entrda:
    var spanNombre = formulario.querySelector("span[id='validarNombreProducto']");
    var spanCategoria = formulario.querySelector("span[id='validarCategoriaProducto']");
    var spanPrecio = formulario.querySelector("span[id='validarPrecioProducto']");
    var spanInventario = formulario.querySelector("span[id='validarInventarioProducto']");

    //Esconder los spans por defecto
    spanNombre.style.display = "none";
    spanCategoria.style.display = "none";
    spanPrecio.style.display = "none";
    spanInventario.style.display = "none";


    //VALIDAR QUE UN CAMPO NO VENGA VACÍO
    var campoNombre = inputNombre.value;
    if (campoNombre.trim() == "") {
        spanNombre.style.display = "block";
        return false;
    }

    var campoCategoria = inputCategoria.value;
    if (campoCategoria.trim() == "") {
        spanCategoria.style.display = "block";
        return false;
    }

    var campoPrecio = inputPrecio.value;
    if (campoPrecio.trim() == "" || (isNaN(campoPrecio)) || Number(campoPrecio < 0)) {
        spanPrecio.style.display = "block";
        inputPrecio.style.border = "red";
        return false;
    }

    var campoInventario = inputInventario.value;
    if (campoInventario.trim() == "" || (isNaN(campoInventario)) || Number(campoInventario < 0)) {
        spanInventario.style.display = "block";
        inputInventario.style.border = "red";
        return false;
    }

    return true;
}



async function enviarFormularioProducto() {

    //let idClient = document.getElementById('idClient').value
    let nombreProducto = document.getElementById('nombreProducto').value
    let categoriaProducto = document.getElementById('categoriaProducto').value
    let precioProducto = document.getElementById('precioProducto').value
    let inventarioProducto = document.getElementById('inventarioProducto').value
    let imagenProducto = document.getElementById('imagenProducto').value


    var datosFormulario = new FormData();// multipart

    //datosFormulario.append("_id", idClient)
    datosFormulario.append("nombre", nombreProducto)
    datosFormulario.append("categoria", categoriaProducto)
    datosFormulario.append("precio", precioProducto)
    datosFormulario.append("inventario", inventarioProducto)
    datosFormulario.append("imagen", imagenProducto)
    var url = "/api/guardarProducto";

    var respuestaServidor = await fetch(url,
        { method: "post", body: datosFormulario });
    var respuesta = await respuestaServidor.json();
    console.log(respuesta);


    Swal.fire({
        title: "¡Muy bien!",
        text: "¡Producto registrado con éxito!" + respuesta.message,
        icon: "success"
    });
}

window.onload = function () {
    inicializarPagina();
    //funcionRegistroAdmin();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FA - PENCIL - MOVER
try {
    //CAMBIOShechos: CAMBIÉ EL .fa-pencil por .linklapiz
    var botonEditar = document.querySelectorAll("#tablaProductos .linkLapiz");
    
    
    console.log(miSpanInterno.innerHTML);
    sessionStorage.setItem("productoEditar", miSpanInterno.innerHTML);

    for (var boton of botonEditar) {
        boton.addEventListener("click", function () {

            miSpanInterno = boton.querySelector("span");
            //console.log(miSpanInterno.innerHTML);
            //document.location.href = "/registroProducto.html";
        });
    }

} catch (error) { }


//PT2
//LLENAR MI TABLA DE PRODUCTOS
//LLENAR MI TABLA DE PRODUCTOS
//LLENAR MI TABLA DE PRODUCTOS
//LLENAR MI TABLA DE PRODUCTOS



/*¿Paraqué hacemos esto de abajo? Para llenar de líneas la tabla de productos de forma dinámica */
async function cargarTablaProductos() {

    var respuestaServidor = await fetch("/api/servidorlistaproductos");
    var listaProductosParseada = await respuestaServidor.JSON();
    
    //Aquí estoy haciendo lo de siempre para atrapar a la #tablaProductos de HTML
    var tablaProductos = document.querySelector("#tablaProductos");

    //Aquí me interesa accesar más específicamente al tbody de #tablaProductos
    var cuerpoTablaProductos = document.querySelector("#tablaProductos tbody");


    /*A la variable cuerpoTablaProductos que contiene al body de la tabla, por medio del .innerHTML
    al ponerle = filaEjemplo le estamos pasando los datos que contiene filaEjemplo que a su vez contiene 
    datos quemados*/
    
    //Esto de quí abajo es el equivalente a una fila
    
    /*¿Cómo añadir más líneas a la tabla?
    cuerpoTablaProductos.innerHTML += filaEjemplo; 
    Aquí se está concatenando y es todo la misma info porque los dato están quemados.*/

    //Aquí hay un arreglo que tengo más abajo. Debe ser dinámico.
    var numeroFilas = listaProductos.length;
    
    cuerpoTablaProductos.innerHTML = "";
    
    for (var producto of listaProductos) {
        

        //Ejemplo de fila con datos quemados, hechos dinámicamente
        //Añadí el <a> dentro de la td del lapiz
        var elJSONenString = JSON.stringify(producto);
        

        var nuevaFilaTabla =
            `<tr>
            <td>${producto.nombre}</td>
            <td>${producto._id}</td>
            <td>${producto.precio}</td>
            <td>${producto.imagen}</td>
            <td>${producto.cantidad}</td>
            <td>
                <span style=display:none;>${elJSONenString}</span>
                <i class"fa-solid fa-pencil"
                data-datos='${elJSONenString}'> 
                </i>
            </td>
           
            <td> <a class="linkLapiz" href="/registroProducto.html">  <i class="fa-solid fa-pencil"></i></a> data-datos="${elJSONenString}" </td>
            </tr>`;
            //console.log(nuevaFilaTabla);
        cuerpoTablaProductos.innerHTML += nuevaFilaTabla;
    }

}


var listaProductos = [
    { nombre: "Atún", _id: "ID00", precio: 1800, imagen: "/imgProductos/atun.png", cantidad: 10 },
    { nombre: "Carne de res", _id: "ID01", precio: 4300, imagen: "/imgProductos/carne.png", cantidad: 15 },
    { nombre: "Aguacate", _id: "ID02", precio: 200, imagen: "/imgProductos/aguacate.png", cantidad: 5 },
    { nombre: "Aceite de oliva", _id: "ID03", precio: 3000, imagen: "/imgProductos/aceiteOliva.png", cantidad: 4 },
];


function validarEdicion(){
    var productoEditarSession = sessionStorage.getItem("productoEditar");
    

    if(productoEditarSession !=null){
        var productoEditar = JSON.parse(elJSONenString);
    }

    var formularioProducto = document.querySelector("#formularioProducto");
    var inputId = formulario.querySelector("input[name='_id']");
    var inputNombre = formulario.querySelector("input[name='nombre']");
    var inputPrecio = formulario.querySelector("input[name='precio']");
    var inputCantidad = formulario.querySelector("input[name='cantidad']");
    var inputImagen = formulario.querySelector("input[name='imagen']");

    inputId.value = productoEditar._id;
    inputNombre.value = productoEditar.nombre;
    inputPrecio.value = productoEditar.precio;
    inputCantidad = productoEditar.cantidad;
    inputImagen = productoEditar.imagen;

    console.log(productoEditar);

}

