var raiz = document.currentScript.getAttribute("raiz");

const htmlSuperior = `<!DOCTYPE html>
<html>

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/css/estilo.css" />
      <title>Feria Virtual</title>

      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <link href="https://fonts.cdnfonts.com/css/liberty-sans" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    </head>

    <body>

        <div class="supEncabezado">
            <img src="">
        </div>

        <div class="supMenu">
            <ul style="float: left">
                <li><a href="/LandingFeria.html"> Página principal </a></li>
            </ul>

            <ul>
                <li><a href="../inicioSesion.html"> Cerrar Sesión </a></li>
            </ul>
        </div>`

document.write(htmlSuperior)
