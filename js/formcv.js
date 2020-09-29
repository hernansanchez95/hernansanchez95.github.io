function revisar(input) {
    if (input.value == "") {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

function revisarMail(input) {
    let expresion = /\w+@\w+\.[a-z]/;
    if (input.value != "") {
        console.log(input.value);
        console.log(expresion.test(input.value));
        if (expresion.test(input.value)) {
            input.className = "form-control is-valid";
            return true;
        } else {
            input.className = "form-control is-invalid";
            return false;
        }
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function revisarNumeros(input) {
    if (isNaN(input.value) || input.value == "") {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

function revisarLongitud(input) {
    if (input.value != "" && input.value.length >= 10) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function validar(event) {
    event.preventDefault();
    if (revisar(document.getElementById('nombre')) &&
        revisarMail(document.getElementById('mail')) &&
        revisarNumeros(document.getElementById('telefono')) &&
        revisarLongitud(document.getElementById('mensaje'))) {
        enviarMail();
    } else {
        alert("Delivery failed.")
    }
}

function enviarMail() {

    let template_params = {
        "from_name": document.getElementById("nombre").value,
        "to_name": "Administrador",
        "message_html": `${document.getElementById('mensaje').value} -
        Empresa: ${document.getElementById('empresa').value} - 
        Mail: ${document.getElementById('mail').value}`
    }

    let service_id = "default_service";
    let template_id = "template_0X8TJd5M";
    emailjs.send(service_id, template_id, template_params).then(
        function (response) {
            console.log("Ok.", response);
            document.getElementById('success').className = "alert alert-success mt-4";
            document.getElementById('success').innerText = "Query sent successfully."
        }, function (error) {
            console.log("Failed.", response);
            document.getElementById('danger').className = "alert alert-danger mt-4";
            document.getElementById('danger').innerText = "Something went wrong."    
        }
    )
}