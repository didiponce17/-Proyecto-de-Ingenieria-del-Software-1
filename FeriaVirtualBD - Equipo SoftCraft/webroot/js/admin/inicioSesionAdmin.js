window.onload = function () {
    inicializarPagina();
}

function inicializarPagina() {
    try {
        var btnIniciarSesion = document.querySelector("#botonIniciarSesionAdmin");

        btnIniciarSesion.addEventListener("click", function () {
            var resultadoFormInicioSesionAdmin = validarFormularioInicioSesionAdmin();

            

            if (resultadoFormInicioSesionAdmin == true) {
                enviarInicioSesionAdmin();
            }
            /*Un else con una función donde el sweet alert de error. Hay que crearlo */
        });
    } catch (error) { }

    try {
        cargarTablaProductos();
    } catch (error) { }

}

function validarFormularioInicioSesionAdmin() {

    var formulario = document.querySelector(".contenedorFormInicioSesionAdmin form");

    var inputIdAdmin = formulario.querySelector("input[name='_idAdmin']");
    var inputContraseAdmin = formulario.querySelector("input[name='contrasenaAdmin']");
    
    var spanIdAdmin = formulario.querySelector("span[id='validarIDadmin']");
    var spanContrAdmin = formulario.querySelector("span[id='validarContrAdmin']");
    
    
    spanIdAdmin.computedStyleMap.display = 'none'
    spanContrAdmin.computedStyleMap.display = 'none'

    var bordeNormal = "1px solid var(--primary-text)"
    inputIdAdmin.style.borderBottom = bordeNormal
    inputContraseAdmin.style.borderBottom = bordeNormal

    var resultadoValidacion = true

    var campoIdAdmin = inputIdAdmin.value;
    if (campoIdAdmin.trim() === "") {
        spanIdAdmin.style.display = "block";
        spanIdAdmin.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoContrAdmin = inputContraseAdmin.value;
    if (campoContrAdmin.trim() === "") {
        spanContrAdmin.style.display = "block";
        spanContrAdmin.style.border = '2px solid red'
        resultadoValidacion = false
    }

    return resultadoValidacion
}

function limiteDigitos(input) {
    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }
}

function enviarInicioSesionAdmin() {
    Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        icon: "info"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href ="LandingAdministrador.html";
        }
    });
}