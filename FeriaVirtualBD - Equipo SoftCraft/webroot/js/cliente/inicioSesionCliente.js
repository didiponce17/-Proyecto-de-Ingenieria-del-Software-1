window.onload = function () {
    inicializarPagina();
}

function inicializarPagina(){
    try {
        var btnIniciarSesion = document.querySelector("#botonIniciarSesionCliente");

        btnIniciarSesion.addEventListener("click", function () {
            var resultadoFormInicioSesionCliente = validarFormularioInicioSesionCliente();

            
            if (resultadoFormInicioSesionCliente == true) {
                enviarInicioSesionCliente();
            }
            /*Un else con una función donde el sweet alert de error. Hay que crearlo */
        });
    } catch (error) { }

    try {
        cargarTablaProductos();
    } catch (error) { }

}

function validarFormularioInicioSesionCliente() {

    var formulario = document.querySelector(".contenedorFormInicioSesionCliente form");

    var inputIdCliente = formulario.querySelector("input[name='_idCliente']");
    var inputContraseCliente = formulario.querySelector("input[name='contraseCliente']");
    
    var spanIdCliente = formulario.querySelector("span[id='validarIDcliente']");
    var spanContrCliente = formulario.querySelector("span[id='validarContrCliente']");
    
    spanIdCliente.computedStyleMap.display = 'none'
    spanContrCliente.computedStyleMap.display = 'none'

    var bordeNormal = "1px solid var(--primary-text)"
    inputIdCliente.style.borderBottom = bordeNormal
    inputContraseCliente.style.borderBottom = bordeNormal

    var resultadoValidacion = true

    var campoIdCliente = inputIdCliente.value;
    if (campoIdCliente.trim() === "") {
        spanIdCliente.style.display = "block";
        spanIdCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoContrCliente = inputContraseCliente.value;
    if (campoContrCliente.trim() === "") {
        spanContrCliente.style.display = "block";
        spanContrCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    return resultadoValidacion
}

function limiteDigitos(input) {
    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }
}


function enviarInicioSesionCliente() {
    Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        icon: "info"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "LandingCliente.html";
        }
    });
}