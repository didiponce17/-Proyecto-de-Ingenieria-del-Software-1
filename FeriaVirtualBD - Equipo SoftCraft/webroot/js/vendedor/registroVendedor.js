window.onload = function () {
    inicializarPagina()
}

function inicializarPagina() {
    try {
        var btnRegistrarVendedor = document.querySelector(".botonRegistrarVendedor")

        btnRegistrarVendedor.addEventListener("click", function () {
            var resultadoValidacionFormularioVendedor = validarFormularioVendedor()

            

            if (resultadoValidacionFormularioVendedor == true) {
                enviarFormularioVendedor();
            }
        });
    } catch (error) { }

}

let inputIdVendedor;
let inputNombreVendedor;

function validarFormularioVendedor() {

    //Variable para jalar el formulario del HTML
    var formulario = document.querySelector(".contenedorformularioVendedor form")

    //Variables que representen los datos de entrada:
    inputIdVendedor = formulario.querySelector("input[name='_idVend']")
    inputNombreVendedor = formulario.querySelector("input[name='nombreVend']")
    var inputPrimApellidoVendedor = formulario.querySelector("input[name='primerApellidoVend']")
    var inputSegApellidoVendedor = formulario.querySelector("input[name='seguApellidoVend']")
    var inputCorreoVendedor = formulario.querySelector("input[name='correoVend']")
    var inputTramoVendedor = formulario.querySelector("input[name='tramoVend']")
    var inputsubirArchivo = formulario.querySelector("input[id='subirArchivo']")
    

    //Variables que representen los spans de validación de cada entrda:
    var spanIdVendedor = formulario.querySelector("span[id='validarIDvend']")
    var spanNombreVendedor = formulario.querySelector("span[id='validarNombreVend']")
    var spanPrimeApellidoVendedor = formulario.querySelector("span[id='validarPrimeApellidoVend']")
    var spanSeguApellidoVendedor = formulario.querySelector("span[id='validarSeguApellidoVend']")
    var spanCorreoVendedor = formulario.querySelector("span[id='validarCorreoVend']")
    var spanTramoVendedor = formulario.querySelector("span[id='validarTramoVend']")
    var spanPermiso = formulario.querySelector("span[id='validarPermiso']")
    
    
    spanIdVendedor.computedStyleMap.display = 'none'
    spanNombreVendedor.computedStyleMap.display = 'none'
    spanPrimeApellidoVendedor.computedStyleMap.display = 'none'
    spanSeguApellidoVendedor.computedStyleMap.display = 'none'
    spanCorreoVendedor.computedStyleMap.display = 'none'
    spanTramoVendedor.computedStyleMap.display = 'none'
    spanPermiso.computedStyleMap.display = 'none'

    var bordeNormal = "1px solid var(--primary-text)"
    inputIdVendedor.style.borderBottom = bordeNormal
    inputNombreVendedor.style.borderBottom = bordeNormal
    inputPrimApellidoVendedor.style.borderBottom = bordeNormal
    inputSegApellidoVendedor.style.borderBottom = bordeNormal
    inputCorreoVendedor.style.borderBottom = bordeNormal
    inputTramoVendedor.style.borderBottom = bordeNormal
    inputsubirArchivo.style.borderBottom = bordeNormal

    var resultadoValidacion = true

    var campoIdVendedor = inputIdVendedor.value
    if (campoIdVendedor.trim() === "") {
        spanIdVendedor.style.display = "block"
        spanIdVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoNombreVendedor = inputNombreVendedor.value;
    if (campoNombreVendedor.trim() === "") {
        spanNombreVendedor.style.display = "block"
        spanNombreVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }
    var campoPrimApellidoVendedor = inputPrimApellidoVendedor.value;
    if (campoPrimApellidoVendedor.trim() === "") {
        spanPrimeApellidoVendedor.style.display = "block"
        spanPrimeApellidoVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }
    var campoSeguApellidoVendedor = inputSegApellidoVendedor.value;
    if (campoSeguApellidoVendedor.trim() === "") {
        spanSeguApellidoVendedor.style.display = "block"
        spanSeguApellidoVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }
    var campoCorreoVendedor = inputCorreoVendedor.value;
    if (campoCorreoVendedor.trim() === "") {
        spanCorreoVendedor.style.display = "block"
        spanCorreoVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoTramoVendedor = inputTramoVendedor.value;
    if (campoTramoVendedor.trim() === "") {
        spanTramoVendedor.style.display = "block"
        spanTramoVendedor.style.border = '2px solid red'
        resultadoValidacion = false
    }

    var campoPermiso = inputsubirArchivo.value;
    if (campoPermiso.trim() === "") {
        spanPermiso.style.display = "block"
        spanPermiso.style.border = '2px solid red'
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

async function enviarFormularioVendedor() {
    let idVendedor = document.getElementById('idVendedor').value
    let nombreVendedor = document.getElementById('nombreVendedor').value
    let primerApellidoVendedor = document.getElementById('primerApellidoVendedor').value
    let seguApellidoVendedor = document.getElementById('seguApellidoVendedor').value
    let correoVendedor = document.getElementById('correoVendedor').value
    //let contraseVendedor = document.getElementById('contraseVendedor').value

    var datosFormulario = new FormData();

    datosFormulario.append("_id", idVendedor)
    datosFormulario.append("nombre", nombreVendedor)
    datosFormulario.append("primerApellido", primerApellidoVendedor)
    datosFormulario.append("segundoApellido", seguApellidoVendedor)
    datosFormulario.append("correo", correoVendedor)
    //datosFormulario.append("password", contraseVendedor)

    console.log(datosFormulario);

    var url = "/api/guardarVendedor";

    var respuestaServidor = await fetch(url,
        { method: "post", body: datosFormulario });
    var respuesta = await respuestaServidor.json();
    console.log(respuesta);

    Swal.fire({
        title: "¡Bienvenido, vendedor!",
        text: "¡Registro realizado con éxito!",
        icon: "success"
    });

    enviarCorreoVendedor();
}

async function enviarCorreoVendedor(){

     // Email data
     const data = {
        de: "contraseña@feriavirtual.com",
        para: "vendedor@feriavirtual.com",
        texto: `Estimado/a ${inputNombreVendedor.value},

        Hemos recibido una solicitud para crear una cuenta en la plataforma de Feria Virtual.

        El administrador revisará tus datos y responderá con la resolución de la petición dentro de 24 horas.
        
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
                title: "¡Gracias!",
                text: "¡Petición de registro realizado con éxito! Recibirá un correo con más instrucciones.",
                icon: "success"
            })
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
