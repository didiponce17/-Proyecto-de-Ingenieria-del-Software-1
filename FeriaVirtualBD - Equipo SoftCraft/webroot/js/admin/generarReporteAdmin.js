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
      tramo: "Vendedor B",
      categoria: "Frutas",
      producto: "Manzana",
      precio: 500,
      cantidad: 150,
    },
    {
      fecha: "28/2/2024",
      tramo: "Vendedor B",
      categoria: "Frutas",
      producto: "Planano",
      precio: 300,
      cantidad: 250,
    },
    {
      fecha: "29/2/2024",
      tramo: "Vendedor B",
      categoria: "Frutas",
      producto: "Naranja",
      precio: 300,
      cantidad: 100,
    },
    {
      fecha: "1/3/2024",
      tramo: "Vendedor B",
      categoria: "Vegetales",
      producto: "Tomate",
      precio: 500,
      cantidad: 90,
    },
    {
      fecha: "1/3/2024",
      tramo: "Vendedor B",
      categoria: "Vegetales",
      producto: "Lechuga",
      precio: 200,
      cantidad: 65,
    },
    {
      fecha: "2/3/2024",
      tramo: "Vendedor B",
      categoria: "Vegetales",
      producto: "Zanahoria",
      precio: 20,
      cantidad: 120,
    },

    {
      fecha: "3/3/2024",
      tramo: "Vendedor B",
      categoria: "Carnes",
      producto: "Cerdo",
      precio: 5500,
      cantidad: 300,
    },
    {
      fecha: "3/3/2024",
      tramo: "Vendedor B",
      categoria: "Carnes",
      producto: "Res",
      precio: 6800,
      cantidad: 130,
    },
    {
      fecha: "4/3/2024",
      tramo: "Vendedor B",
      categoria: "Carnes",
      producto: "Pollo",
      precio: 3500,
      cantidad: 100,
    },
    {
      fecha: "7/3/2024",
      tramo: "Vendedor B",
      categoria: "Mariscos",
      producto: "Camarones",
      precio: 7500,
      cantidad: 25,
    },
    {
      fecha: "8/3/2024",
      tramo: "Vendedor B",
      categoria: "Mariscos",
      producto: "Pescado",
      precio: 5000,
      cantidad: 30,
    },
    {
      fecha: "8/3/2024",
      tramo: "Vendedor B",
      categoria: "Mariscos",
      producto: "Calamares",
      precio: 4500,
      cantidad: 20,
    },
  ];

  // Crear la tabla con los datos del reporte
  const admintabla = document.createElement("table");
  admintabla.className = "table";
  const encabezados = [
    "Fecha",
    "Tramo",
    "Categoría",
    "Producto",
    "Precio por Unidad",
    "Cantidad Vendida",
    "Total Ventas",
  ];
  const encabezadosRow = admintabla.insertRow();
  encabezados.forEach((encabezado) => {
    const th = document.createElement("th");
    th.textContent = encabezado;
    encabezadosRow.appendChild(th);
  });

  datosReporte.forEach((dato) => {
    const row = admintabla.insertRow();
    row.insertCell().textContent = dato.fecha;
    row.insertCell().textContent = dato.tramo;
    row.insertCell().textContent = dato.categoria;
    row.insertCell().textContent = dato.producto;

    // Formatear precio con símbolo de colones
    const precioFormateado = new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(dato.precio);
    row.insertCell().textContent = precioFormateado;

    // Agregar unidad de medida "kg" a la cantidad
    const cantidadFormateada = `${dato.cantidad} kg`;
    row.insertCell().textContent = cantidadFormateada;

    // Calcular y formatear total ventas
    const totalVentas = dato.precio * dato.cantidad;
    const totalVentasFormateado = new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(totalVentas);
    row.insertCell().textContent = totalVentasFormateado;
  });

  // Mostrar la tabla en el elemento con id "reporte"
  const reporteDiv = document.getElementById("reporte-administrador");
  reporteDiv.innerHTML = "";
  reporteDiv.appendChild(admintabla);
}

function descargarCSV() {
  // Datos inventados para el ejemplo
  const datosReporte = [
    {
      fecha: "28/2/2024",
      tramo: "Vendedor B",
      categoria: "Frutas",
      producto: "Manzana",
      precio: 500,
      cantidad: 150,
    },
    {
      fecha: "28/2/2024",
      tramo: "Vendedor B",
      categoria: "Frutas",
      producto: "Planano",
      precio: 300,
      cantidad: 250,
    },
    {
      fecha: "29/2/2024",
      tramo: "Vendedor B",
      categoria: "Frutas",
      producto: "Naranja",
      precio: 300,
      cantidad: 100,
    },
    {
      fecha: "1/3/2024",
      tramo: "Vendedor B",
      categoria: "Vegetales",
      producto: "Tomate",
      precio: 500,
      cantidad: 90,
    },
    {
      fecha: "1/3/2024",
      tramo: "Vendedor B",
      categoria: "Vegetales",
      producto: "Lechuga",
      precio: 200,
      cantidad: 65,
    },
    {
      fecha: "2/3/2024",
      tramo: "Vendedor B",
      categoria: "Vegetales",
      producto: "Zanahoria",
      precio: 20,
      cantidad: 120,
    },

    {
      fecha: "3/3/2024",
      tramo: "Vendedor B",
      categoria: "Carnes",
      producto: "Cerdo",
      precio: 5500,
      cantidad: 300,
    },
    {
      fecha: "3/3/2024",
      tramo: "Vendedor B",
      categoria: "Carnes",
      producto: "Res",
      precio: 6800,
      cantidad: 130,
    },
    {
      fecha: "4/3/2024",
      tramo: "Vendedor B",
      categoria: "Carnes",
      producto: "Pollo",
      precio: 3500,
      cantidad: 100,
    },
    {
      fecha: "7/3/2024",
      tramo: "Vendedor B",
      categoria: "Mariscos",
      producto: "Camarones",
      precio: 7500,
      cantidad: 25,
    },
    {
      fecha: "8/3/2024",
      tramo: "Vendedor B",
      categoria: "Mariscos",
      producto: "Pescado",
      precio: 5000,
      cantidad: 30,
    },
    {
      fecha: "8/3/2024",
      tramo: "Vendedor B",
      categoria: "Mariscos",
      producto: "Calamares",
      precio: 4500,
      cantidad: 20,
    },
  ];

  // Convertir los datos a formato CSV
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent +=
    "Fecha, Tramo, Categoría,Producto,Precio por Unidad (CRC),Cantidad Vendida (kg),Total Ventas (CRC)\r\n"; // Encabezados
  datosReporte.forEach((dato) => {
    const row = `${dato.fecha},${dato.categoria},${dato.producto},${
      dato.precio
    },${dato.cantidad},${(dato.precio * dato.cantidad).toFixed(2)}\r\n`;
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
