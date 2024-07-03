document.getElementById("cardnumber").addEventListener("input", function(event) {
    var input = event.target;
    var inputValue = input.value.replace(/\D/g, '');
    
    if (inputValue.length > 16) {
        inputValue = inputValue.substring(0, 16);
    }

    input.value = inputValue;
});

document.getElementById('cardname').addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
});

var expirationInput = document.getElementById("cardexpiration");

expirationInput.addEventListener("input", function() {
    var valor = expirationInput.value;
    var newValue = valor.replace(/\D/g, "");

    if (newValue.length > 4) {
        newValue = newValue.substring(0, 4);
    }

    expirationInput.value = newValue;
});

var cvcInput = document.getElementById("cardcvc");
cvcInput.addEventListener("input", function() {
    var valor = cvcInput.value;
    var newValue = valor.replace(/\D/g, "");
    
    cvcInput.value = newValue;
});

document.getElementById("AgregarTarjeta").addEventListener("click", async function(event) {
    event.preventDefault(); 

    var number = document.getElementById("cardnumber").value;
    var name = document.getElementById("cardname").value;
    var expiration = document.getElementById("cardexpiration").value;
    var cvc = document.getElementById("cardcvc").value;

    if (number.length < 16) {
        Swal.fire("El número de tarjeta debe tener 16 dígitos");
        return;
    }

    if (expiration.length < 4) {
        Swal.fire("La fecha de expiración debe tener 4 dígitos");
        return;
    }

    if (cvc.length < 3) {
        Swal.fire("El código CVC debe tener al menos 3 dígitos");
        return;
    }

    try {
        const response = await fetch('/api/guardardatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number, name, expiration, cvc })
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }

        Swal.fire({
            icon: "success",
            title: "¡Tarjeta Agregada!",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'LandingCliente.html';
            }
        });
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al agregar tarjeta',
            text: 'Por favor, intente de nuevo',
        });
    }
});
