function rangoFechas() {
  var fechaInicial = new Date(
    document.getElementById("inputFechaInicial").value
  );
  var fechaFinal = new Date(document.getElementById("inputFechaFinal").value);

  if (fechaInicial && fechaFinal) {
    if (fechaInicial > fechaFinal) {
      alert("La fecha inicial no puede ser mayor que la fecha final.");
      document.getElementById("inputFechaInicial").value =
        document.getElementById("inputFechaFinal").value;
    } else if (fechaFinal < fechaInicial) {
      alert("La fecha final no puede ser menor que la fecha inicial.");
      document.getElementById("inputFechaFinal").value =
        document.getElementById("inputFechaInicial").value;
    }
  }
}

function generarReporte() {
  // Datos inventados para el ejemplo
  const datosReporte = [
    {
      fecha: "28/2/2024",
      categoria: "Frutas",
      producto: "Manzana",
      precio: 500,
      cantidad: 1,
      estado: "Ordenado",
    },
    {
      fecha: "28/2/2024",
      categoria: "Frutas",
      producto: "Planano",
      precio: 300,
      cantidad: 2,
      estado: "Ordenado",
    },
    {
      fecha: "29/2/2024",
      categoria: "Frutas",
      producto: "Naranja",
      precio: 300,
      cantidad: 2,
      estado: "Ordenado",
    },
    {
      fecha: "1/3/2024",
      categoria: "Vegetales",
      producto: "Tomate",
      precio: 500,
      cantidad: 1,
      estado: "Entregado",
    },
    {
      fecha: "1/3/2024",
      categoria: "Vegetales",
      producto: "Lechuga",
      precio: 200,
      cantidad: 3,
      estado: "Entregado",
    },
    {
      fecha: "2/3/2024",
      categoria: "Vegetales",
      producto: "Zanahoria",
      precio: 20,
      cantidad: 2.5,
      estado: "En ruta",
    },

    {
      fecha: "3/3/2024",
      categoria: "Carnes",
      producto: "Cerdo",
      precio: 5500,
      cantidad: 1.5,
      estado: "En ruta",
    },
    {
      fecha: "3/3/2024",
      categoria: "Carnes",
      producto: "Res",
      precio: 6800,
      cantidad: 2,
      estado: "Cancelado",
    },
    {
      fecha: "4/3/2024",
      categoria: "Carnes",
      producto: "Pollo",
      precio: 3500,
      cantidad: 1.5,
      estado: "Ordenado",
    },
    {
      fecha: "7/3/2024",
      categoria: "Mariscos",
      producto: "Camarones",
      precio: 7500,
      cantidad: 2,
      estado: "Entregado",
    },
    {
      fecha: "8/3/2024",
      categoria: "Mariscos",
      producto: "Pescado",
      precio: 5000,
      cantidad: 3.5,
      estado: "Entregado",
    },
    {
      fecha: "8/3/2024",
      categoria: "Mariscos",
      producto: "Calamares",
      precio: 4500,
      cantidad: 2,
      estado: "Cancelado",
    },
  ];

  // Crear la tabla con los datos del reporte
  // Crear la tabla con los datos del reporte
  const tablacliente = document.createElement("table");
  tablacliente.className = "table";
  const encabezados = [
    "Fecha",
    "Categoría",
    "Producto",
    "Precio por Unidad",
    "Cantidad Vendida",
    "Total Compras",
    "Estado",
  ];
  const encabezadosRow = tablacliente.insertRow();
  encabezados.forEach((encabezado) => {
    const th = document.createElement("th");
    th.textContent = encabezado;
    encabezadosRow.appendChild(th);
  });

  datosReporte.forEach((dato) => {
    const row = tablacliente.insertRow();
    row.insertCell().textContent = dato.fecha;
    row.insertCell().textContent = dato.categoria;
    row.insertCell().textContent = dato.producto;

    // Corrección: Asegurarse de que el precio se muestre en la columna correcta
    const precioFormateado = new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(dato.precio);
    row.insertCell().textContent = precioFormateado;

    // Corrección: Asegurarse de que la cantidad se muestre en la columna correcta
    const cantidadFormateada = `${dato.cantidad} kg`;
    row.insertCell().textContent = cantidadFormateada;

    // Corrección: Calcular y formatear total compras
    const totalCompras = dato.precio * dato.cantidad;
    const totalComprasFormateado = new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(totalCompras);
    row.insertCell().textContent = totalComprasFormateado;

    // Corrección: Asegurarse de que el estado se muestre en la columna correcta
    row.insertCell().textContent = dato.estado;
  });

  // Mostrar la tabla en el elemento con id "reporte-cliente"
  const reporteDiv = document.getElementById("reporte-cliente");
  reporteDiv.innerHTML = "";
  reporteDiv.appendChild(tablacliente);
}

function descargarCSV() {
  // Datos inventados para el ejemplo
  const datosReporte = [
    {
      fecha: "28/2/2024",
      categoria: "Frutas",
      producto: "Manzana",
      precio: 500,
      cantidad: 1,
      estado: "Ordenado",
    },
    {
      fecha: "28/2/2024",
      categoria: "Frutas",
      producto: "Planano",
      precio: 300,
      cantidad: 2,
      estado: "Ordenado",
    },
    {
      fecha: "29/2/2024",
      categoria: "Frutas",
      producto: "Naranja",
      precio: 300,
      cantidad: 2,
      estado: "Ordenado",
    },
    {
      fecha: "1/3/2024",
      categoria: "Vegetales",
      producto: "Tomate",
      precio: 500,
      cantidad: 1,
      estado: "Entregado",
    },
    {
      fecha: "1/3/2024",
      categoria: "Vegetales",
      producto: "Lechuga",
      precio: 200,
      cantidad: 3,
      estado: "Entregado",
    },
    {
      fecha: "2/3/2024",
      categoria: "Vegetales",
      producto: "Zanahoria",
      precio: 20,
      cantidad: 2.5,
      estado: "En ruta",
    },

    {
      fecha: "3/3/2024",
      categoria: "Carnes",
      producto: "Cerdo",
      precio: 5500,
      cantidad: 1.5,
      estado: "En ruta",
    },
    {
      fecha: "3/3/2024",
      categoria: "Carnes",
      producto: "Res",
      precio: 6800,
      cantidad: 2,
      estado: "Cancelado",
    },
    {
      fecha: "4/3/2024",
      categoria: "Carnes",
      producto: "Pollo",
      precio: 3500,
      cantidad: 1.5,
      estado: "Ordenado",
    },
    {
      fecha: "7/3/2024",
      categoria: "Mariscos",
      producto: "Camarones",
      precio: 7500,
      cantidad: 2,
      estado: "Entregado",
    },
    {
      fecha: "8/3/2024",
      categoria: "Mariscos",
      producto: "Pescado",
      precio: 5000,
      cantidad: 3.5,
      estado: "Entregado",
    },
    {
      fecha: "8/3/2024",
      categoria: "Mariscos",
      producto: "Calamares",
      precio: 4500,
      cantidad: 2,
      estado: "Cancelado",
    },
  ];

  // Convertir los datos a formato CSV
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent +=
    "Fecha,Categoría,Producto,Precio por Unidad (CRC),Cantidad Vendida (kg),Total Ventas (CRC),Estado\r\n"; // Encabezados
  datosReporte.forEach((dato) => {
    const row = `${dato.fecha},${dato.categoria},${dato.producto},${
      dato.precio
    },${dato.cantidad},${(dato.precio * dato.cantidad).toFixed(2)},${
      dato.estado
    }\r\n`;
    csvContent += row;
  });

  // Crear un elemento de enlace para descargar el CSV
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "reporte.csv");
  document.body.appendChild(link); // Necesario para Firefox

  // Simular un click en el enlace para descargar el archivo
  link.click();
  document.body.removeChild(link); // Limpiar el enlace del DOM
}
