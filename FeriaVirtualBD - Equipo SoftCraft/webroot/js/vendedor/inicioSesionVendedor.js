window.onload = function () {
    inicializarPagina();
}

function inicializarPagina() {
    try {
        var btnIniciarSesion = document.querySelector("#botonIniciarSesionVendedor");

        btnIniciarSesion.addEventListener("click", function () {
            var resultadoFormInicioSesionVendedor = validarFormularioInicioSesionVendedor();

            
            if (resultadoFormInicioSesionVendedor == true) {
                enviarInicioSesionVendedor();
            }
            /*Un else con una función donde el sweet alert de error. Hay que crearlo */
        });
    } catch (error) { }

    try {
        cargarTablaProductos();
    } catch (error) { }

}

function validarFormularioInicioSesionVendedor() {

    var formulario = document.querySelector(".contenedorFormInicioSesionVendedor form");

    var inputIdVendedor = formulario.querySelector("input[name='_idVend']");
    var inputContraseVendedor = formulario.querySelector("input[name='contraseVend']");
    
    var spanIdVendedor = formulario.querySelector("span[id='validarIDvend']");
    var spanContrVendedor = formulario.querySelector("span[id='validarContrVendedor']");
    
    spanIdVendedor.computedStyleMap.display = 'none'
    spanContrVendedor.computedStyleMap.display = 'none'

    var bordeNormal = "1px solid var(--primary-text)"
    inputIdVendedor.style.borderBottom = bordeNormal
    inputContraseVendedor.style.borderBottom = bordeNormal

    var resultadoValidacion = true

    var campoIdVendedor = inputIdVendedor.value
    if (campoIdVendedor.trim() === "") {
        spanIdVendedor.style.display = "block"
        spanIdVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoContrVendedor = inputContraseVendedor.value
    if (campoContrVendedor.trim() === "") {
        spanContrVendedor.style.display = "block"
        spanContrVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }

    return resultadoValidacion
}

function limiteDigitos(input) {
    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }
}

function enviarInicioSesionVendedor() {
    Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        icon: "info"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href ="LandingVendedor.html";
        }
    });
}