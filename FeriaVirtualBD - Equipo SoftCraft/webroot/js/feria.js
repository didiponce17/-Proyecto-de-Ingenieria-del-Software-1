var listaProductos = [
  {
    nombre: "Atún",
    _id: "ID00",
    precio: 1800,
    imagen: "/imgProductos/atun.png",
    cantidad: 10,
  },
  {
    nombre: "Carne de res",
    _id: "ID01",
    precio: 4300,
    imagen: "/imgProductos/carne.png",
    cantidad: 15,
  },
  {
    nombre: "Aguacate",
    _id: "ID02",
    precio: 200,
    imagen: "/imgProductos/aguacate.png",
    cantidad: 5,
  },
  {
    nombre: "Aceite de oliva",
    _id: "ID03",
    precio: 3000,
    imagen: "/imgProductos/aceite.png",
    cantidad: 4,
  },
  {
    nombre: "Kiwi",
    _id: "ID05",
    precio: 200,
    imagen: "/imgProductos/kiwi.png",
    cantidad: 5,
  },
  {
    nombre: "Tomate",
    _id: "ID05",
    precio: 3000,
    imagen: "/imgProductos/tomate.png",
    cantidad: 4,
  },
  {
    nombre: "Naranjas",
    _id: "ID06",
    precio: 3000,
    imagen: "/imgProductos/naranja.png",
    cantidad: 4,
  },
  {
    nombre: "Uvas",
    _id: "ID07",
    precio: 200,
    imagen: "/imgProductos/uvas.png",
    cantidad: 5,
  },
  {
    nombre: "Mandarinas",
    _id: "ID08",
    precio: 3000,
    imagen: "/imgProductos/mandarina.png",
    cantidad: 4,
  },
  {
    nombre: "Pescados",
    _id: "ID09",
    precio: 3000,
    imagen: "/imgProductos/aceiteOliva.png",
    cantidad: 4,
  },
  {
    nombre: "Papas",
    _id: "ID010",
    precio: 200,
    imagen: "/imgProductos/aguacate.png",
    cantidad: 5,
  },
  {
    nombre: "Chuleta de Cerdo",
    _id: "ID011",
    precio: 3000,
    imagen: "/imgProductos/chuleta.png",
    cantidad: 4,
  },
  {
    nombre: "Mariscos",
    _id: "ID012",
    precio: 3000,
    imagen: "/imgProductos/mariscos.png",
    cantidad: 4,
  },
  {
    nombre: "Limones",
    _id: "ID013",
    precio: 200,
    imagen: "/imgProductos/limones.png",
    cantidad: 5,
  },
  {
    nombre: "Bananos",
    _id: "ID014",
    precio: 3000,
    imagen: "/imgProductos/banano.png",
    cantidad: 4,
  },
  {
    nombre: "Chile Dulce",
    _id: "ID015",
    precio: 3000,
    imagen: "/imgProductos/chile.png",
    cantidad: 4,
  },
  {
    nombre: "Cebollas",
    _id: "ID016",
    precio: 200,
    imagen: "/imgProductos/cebolla.png",
    cantidad: 5,
  },
  {
    nombre: "Ajo",
    _id: "ID017",
    precio: 3000,
    imagen: "/imgProductos/ajo.png",
    cantidad: 4,
  },
  {
    nombre: "Pasas",
    _id: "ID018",
    precio: 3000,
    imagen: "/imgProductos/pasas.png",
    cantidad: 4,
  },
  {
    nombre: "Manzanas",
    _id: "ID019",
    precio: 3000,
    imagen: "/imgProductos/manzana.png",
    cantidad: 4,
  },
];

var carritoCompras = [];
/* cada objeto del carrito de compras es:
      {
      idProducto: "@referencia a Productos._id",
      cantidadComprada: 0
      }
  */
function actualizarCarrito() {
  var elCarritoGuardado = sessionStorage.getItem("carrito");
  //console.log(elCarritoGuardado)
  if (elCarritoGuardado != null) {
    carritoCompras = JSON.parse(elCarritoGuardado);
  }

  var vistaCesta = document.querySelector(`.vistaCesta`);
  vistaCesta.innerHTML = `<h5>Cesta</h5><hr>`;
  vistaCesta.innerHTML += JSON.stringify(carritoCompras);
}

function cargarMosaicoProductos() {
  actualizarCarrito();

  var contenedorProductos = document.querySelector("section.mosaicoProductos");

  contenedorProductos.innerHTML = "";

  for (var producto of listaProductos) {
    var productoArticulo = `
      <article class="articulo">
              <h1> ${producto.nombre} </h1>
  
              <input  type=hidden value=${producto._id}>
  
              <label>Cantidad</label> 
  
              <input id="inpProducto" name="${producto._id}" type="number"
                  value="0"
                  min="1"
                  max="${producto.cantidad}"><br>
  
              <label>Disponibles:  </label>${producto.cantidad}<br>
              <label>Precio  </label>${producto.precio} CRC<br>
              <a href="/html/cliente/tiendaCliente.html"> Tienda </a><br>
              <img class="imgProducto" src="${producto.imagen}">
              
              <button id="btnAgregar" onclick="agregarProducto('${producto._id}')"
              >Agregar a la cesta</button>
  
          </article>`;

    // Esto es para no caerle encima a mis artículos anteriores
    contenedorProductos.innerHTML += productoArticulo;
  }

  var vistaCesta = document.querySelector(`.vistaCesta`);
  vistaCesta.innerHTML = `<h5>Cesta</h5><hr>`;
  vistaCesta.innerHTML += JSON.stringify(carritoCompras);
}

function agregarProducto(idProducto) {
  var casillaComprar = document.querySelector(`input[name='${idProducto}']`);
  var cantidad = parseInt(casillaComprar.value);
  var producto = {
    idProducto: idProducto,
    cantidadComprada: cantidad,
  };
  carritoCompras.push(producto);
  sessionStorage.setItem("carrito", JSON.stringify(carritoCompras));
}

function verCarrito() {
  var carritoComprasString = JSON.stringify(carritoCompras);
  sessionStorage.setItem("carrito", carritoComprasString);
  location.href = "/html/carrito.html";
}

function mostrarCarrito() {
  var contenedorCarrito = document.querySelector(".contenedorCarrito");

  var elCarritoGuardado = sessionStorage.getItem("carrito");
  if (elCarritoGuardado != null) {
    carritoCompras = JSON.parse(elCarritoGuardado);
  }

  var encabezadoFactura = `<h2>Factura #</h2><hr><hr>`;
  contenedorCarrito.innerHTML = encabezadoFactura;

  var total = 0;
  for (var linea of carritoCompras) {
    var producto = listaProductos.find((item) => item._id === linea.idProducto);
    var subtotal = producto.precio * linea.cantidadComprada;
    total += subtotal;
    var textoLinea = `<div>
          <label>${producto.nombre} x ${linea.cantidadComprada} &#8353;${producto.precio}</label>
          <input type='button' value='Eliminar del carrito' onclick='eliminarProducto("${producto._id}")'><hr>
      </div>`;
    contenedorCarrito.innerHTML += textoLinea;
  }

  var totalAPagar = `<label>Total a pagar: &#8353; ${total}</label><br>`;
  contenedorCarrito.innerHTML += totalAPagar;

  contenedorCarrito.innerHTML +=
    "<input id='confirmButton' type='button' value='Confirmar'>";

  // Add event listener to the button
  document
    .getElementById("confirmButton")
    .addEventListener("click", function () {
      // Show the Swal alert with options
      Swal.fire({
        title: "Confirmar compra",
        text: "¿Estás seguro de querer continuar con la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        // If the user confirms the action, redirect to the desired location
        if (result.isConfirmed) {
          window.location.href = "carrito.html";
          vaciarCarrito();
        }
      });
    });
}

function vaciarCarrito() {
  carritoCompras = [];
  sessionStorage.setItem("carrito", "[]");
  window.location.reload();
}

function eliminarProducto(idProducto) {
  carritoCompras = carritoCompras.filter(
    (item) => item.idProducto !== idProducto
  );
  sessionStorage.setItem("carrito", JSON.stringify(carritoCompras));
  mostrarCarrito();
}

window.onload = function () {
  /* codigo para feria */
  if (raiz == "mosaico") {
    try {
      setInterval("actualizarCarrito()", 1000);
      cargarMosaicoProductos();
    } catch (error) {}
  } else if (raiz == "cesta") {
    /* codigo para carrito */
    try {
      mostrarCarrito();
    } catch (error) {}
  }
};
