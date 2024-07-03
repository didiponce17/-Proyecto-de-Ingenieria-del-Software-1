window.onload = function () {
    inicializarPagina();
}

function inicializarPagina() {
    try {
        var btnRegistrarCliente = document.querySelector(".botonRegistrarCliente");

        btnRegistrarCliente.addEventListener("click", function () {
            var resultadoValidacionFormularioCliente = validarFormularioCliente();



            if (resultadoValidacionFormularioCliente == true) {
                enviarFormularioCliente();
            }
        });
    } catch (error) { }

}

let inputIdCliente;
let inputNombreCliente;

function validarFormularioCliente() {

    var formulario = document.querySelector('.contenedorFormularioCliente form')

    inputIdCliente = formulario.querySelector("input[name='_idCliente']")
    inputNombreCliente = formulario.querySelector("input[name='nombreCliente']")
    var inputPrimApellidoCliente = formulario.querySelector("input[name='primerApellidoCliente']")
    var inputSegApellidoCliente = formulario.querySelector("input[name='seguApellidoCliente']")
    var inputCorreoCliente = formulario.querySelector("input[name='correoCliente']")

    var spanIdCliente = formulario.querySelector("span[id='validarIDcliente']")
    var spanNombreCliente = formulario.querySelector("span[id='validarNombreCliente']")
    var spanPrimeApellidoCliente = formulario.querySelector("span[id='validarPrimeApellidoCliente']")
    var spanSeguApellidoCliente = formulario.querySelector("span[id='validarSeguApellidoCliente']")
    var spanCorreoCliente = formulario.querySelector("span[id='validarCorreoCliente']")

    spanIdCliente.computedStyleMap.display = 'none'
    spanNombreCliente.computedStyleMap.display = 'none'
    spanPrimeApellidoCliente.computedStyleMap.display = 'none'
    spanSeguApellidoCliente.computedStyleMap.display = 'none'
    spanCorreoCliente.computedStyleMap.display = 'none'

    var bordeNormal = "1px solid var(--primary-text)"
    inputIdCliente.style.borderBottom = bordeNormal
    inputNombreCliente.style.borderBottom = bordeNormal
    inputPrimApellidoCliente.style.borderBottom = bordeNormal
    inputSegApellidoCliente.style.borderBottom = bordeNormal
    inputCorreoCliente.style.borderBottom = bordeNormal

    var resultadoValidacion = true

    var campoIdCliente = inputIdCliente.value;
    if (campoIdCliente.trim() === "") {
        spanIdCliente.style.display = "block";
        spanIdCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoNombreCliente = inputNombreCliente.value;
    if (campoNombreCliente.trim() === "") {
        spanNombreCliente.style.display = "block"
        spanNombreCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoPrimApellidoCliente = inputPrimApellidoCliente.value;
    if (campoPrimApellidoCliente.trim() === "") {
        spanPrimeApellidoCliente.style.display = "block";
        spanPrimeApellidoCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoSeguApellidoCliente = inputSegApellidoCliente.value;
    if (campoSeguApellidoCliente.trim() === "") {
        spanSeguApellidoCliente.style.display = "block";
        spanSeguApellidoCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoCorreoCliente = inputCorreoCliente.value;
    if (campoCorreoCliente.trim() === "") {
        spanCorreoCliente.style.display = "block";
        spanCorreoCliente.style.border = '2px solid red'
        resultadoValidacion = false
    }

    return resultadoValidacion
}

function limiteDigitos(input) {
    if (input.value.length > input.maxLength) {
        input.value = input.value.slice(0, input.maxLength);
    }
}

function soloLetras(event) {
    const pattern = /[a-zA-Z]/;
    const inputChar = String.fromCharCode(event.keyCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

async function enviarFormularioCliente() {

    let idClient = document.getElementById('idClient').value
    let nombreClient = document.getElementById('nombreClient').value
    let primerApellidoClient = document.getElementById('primerApellidoClient').value
    let seguApellidoClient = document.getElementById('seguApellidoClient').value
    let correoClient = document.getElementById('correoClient').value
    //let contraseClient = document.getElementById('contraseClient').value


    var datosFormulario = new FormData();// multipart

    datosFormulario.append("_id", idClient)
    datosFormulario.append("nombre", nombreClient)
    datosFormulario.append("primerApellido", primerApellidoClient)
    datosFormulario.append("segundoApellido", seguApellidoClient)
    datosFormulario.append("correo", correoClient)
    //datosFormulario.append("password", contraseClient)
    var url = "/api/guardarClientes";

    var respuestaServidor = await fetch(url,
        { method: "post", body: datosFormulario });
    var respuesta = await respuestaServidor.json();
    console.log(respuesta);
    

    enviarCorreoCliente();

}


async function enviarCorreoCliente() {
    const randomPassword = generateRandomPassword(10);

    // Email data
    const data = {
        de: "contraseña@feriavirtual.com",
        para: "cliente@feriavirtual.com",
        texto: `Estimado/a ${inputNombreCliente.value},

        Hemos recibido una solicitud para crear una cuenta en la plataforma de Feria Virtual. 
        Por favor, accede a tu cuenta utilizando esta contraseña temporal:
        
        Contraseña Temporal: ${randomPassword}
        
        Te recomendamos que cambies tu contraseña tan pronto como sea posible por motivos de seguridad.

        Recuerda que tu usuario es: ${inputIdCliente.value}
        
        Gracias y ¡que tengas un excelente día!
        
        Atentamente,
        Equipo de Feria Virtual`
    };

    // Send email using POST request
    fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "¡Registro realizado con éxito! El correo electrónico ha sido enviado.",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "inicioSesionCliente.html";
                    }
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error al enviar el correo electrónico.",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al enviar el correo electrónico.",
                icon: "error"
            });
        });
}