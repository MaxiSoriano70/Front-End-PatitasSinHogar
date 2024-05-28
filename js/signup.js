window.addEventListener('load', function () {
    const formRegistrarse = document.querySelector("#form-registrarse");
    const emailRegistrarse = document.querySelector("#email-registrarse");
    const nombreRegistrarse = document.querySelector("#nombre-registrarse");
    const apellidoRegistrarse = document.querySelector("#apellido-registrarse");
    const telefonoRegistrarse = document.querySelector("#telefono-registrarse");
    const fechaDeNacimientoRegistrarse = document.querySelector("#fecha-nacimiento-registrarse");
    const contraseniaRegistrarse = document.querySelector("#password-registrarse");
    const contraseniaRepetirRegistrarse = document.querySelector("#password-repetir-registrarse");
    const url = null;

    emailRegistrarse.addEventListener("input", e => validarMail(e));
    nombreRegistrarse.addEventListener("input", e => validarTexto(e));
    apellidoRegistrarse.addEventListener("input", e => validarTexto(e));
    telefonoRegistrarse.addEventListener("input", e => validarTelefono(e));
    fechaDeNacimientoRegistrarse.addEventListener("input", e => validarFechaDeNacimiento(e));
    contraseniaRegistrarse.addEventListener("input", e => validarContrasenia(e));
    contraseniaRepetirRegistrarse.addEventListener("input", e => validarContraseniasIguales(e, contraseniaRegistrarse));

    emailRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${emailRegistrarse.name}`, e));
    nombreRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${nombreRegistrarse.name}`, e));
    apellidoRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${apellidoRegistrarse.name}`, e));
    telefonoRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${telefonoRegistrarse.name}`, e));
    fechaDeNacimientoRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${fechaDeNacimientoRegistrarse.name}`, e));
    contraseniaRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${contraseniaRegistrarse.name}`, e));
    contraseniaRepetirRegistrarse.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${contraseniaRepetirRegistrarse.name}`, e))

    formRegistrarse.addEventListener('submit', function(event){
    event.preventDefault();
    /* Validación */

        const payload = {
            email: emailRegistrarse.value,
            nombreApellido: nombreApellidoRegistrarse.value,
            telefono: telefonoRegistrarse.value,
            fechaDeNacimiento: fechaDeNacimientoRegistrarse.value,
            contrasenia: contraseniaRegistrarse.value
        }

        if(url == null){
            console.log("karen")
        }
        else{
            const settings = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            realizarRegistro(settings);
        }

    });


    function realizarRegistro(settings) {
        console.log(settings);
        console.log("Comienza el FETCH");
        fetch(`${url}/users`, settings)
        .then(response => {
            if (response.ok) return response.json()
            return Promise.reject(response)
        })
        .then(data => {
            console.log("Promesa cumplida")
            console.log(data);
            /*TOKEN*/
            console.log(data.jwt);

            if (data.jwt) {
                /*Guardamos en el localStorage*/
                localStorage.setItem("jwt", JSON.stringify(data.jwt));

                /*Redirigimos al usuario*/
                location.replace("./index.html");
            }
        })
        .catch(err => {
            console.log("Promesa rechazada");
            console.error(err.status);
            if (err.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "Error en el registro",
                    text: "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error del servidor, comuniquese con el proveedor.",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                });
            }
        })
        console.log("Termina el FETCH");
    };

    const buscarEmailUsuario = (payload) => {
        let usuarios = [
            {
                id: 1,
                email: "maxi@gmail.com",
                nombreApellido: "Maxi Soriano",
                telefono: "123-456-7890",
                fechaDeNacimiento: "1997-06-05",
                contrasenia: "Maximo123"
            },
            {
                id: 2,
                email: "cele@gmail.com",
                nombreApellido: "Celeste Severich",
                telefono: "098-765-4321",
                fechaDeNacimiento: "1992-02-02",
                contrasenia: "Celeste123"
            }
        ];
        const usuarioEncontrado = usuarios.find(usuario =>
            usuario.email === payload.email
        );
        return usuarioEncontrado || null;
    };
});