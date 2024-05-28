window.addEventListener('load', function(){

    const formIniciarSesion = document.querySelector("#form-iniciar-sesion");
    const emailIniciarSesion = document.querySelector("#email-iniciar-sesion");
    const contraseniaIniciarSesion = document.querySelector("#password-iniciar-sesion");
    const btnIniciarSesion = document.querySelector("#btn-ingresar");
    const url = null;

    emailIniciarSesion.addEventListener("input", e => validarMail(e));
    contraseniaIniciarSesion.addEventListener("input", e=> validarContrasenia(e));

    emailIniciarSesion.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${emailIniciarSesion.name}`, e))
    contraseniaIniciarSesion.addEventListener("blur", e => isEmpty(`Se requiere que ingrese su ${contraseniaIniciarSesion.name}`, e))

    formIniciarSesion.addEventListener('submit', function(event){
        event.preventDefault();

        /*Crear el cuerpo para enviarlo por el FETCH*/
        const payload = {
            email: emailIniciarSesion.value,
            password: contraseniaIniciarSesion.value
        }

        if(url == null ){
            let usuarioEncontrado = buscarUsuario(payload);
            if (usuarioEncontrado) {
                localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
                Swal.fire({
                    icon: "success",
                    title: "¡Bienvenid@!",
                    text: `${usuarioEncontrado.nombreApellido}`,
                    showConfirmButton: false,
                    textColor: "#000",
                    background: "#eaeef4",
                    timer: 1500
                });
                setTimeout(() => {
                    location.replace("./index.html");
                }, 1500);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Usuario no encontrado o credenciales incorrectas.",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                });
            }

        }else{
            /*Configuramos el objeto que le vamos a pasar por parametro al FETCH*/
            const settings = {
                meythod: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            realizarLogin(settings);
        }

        /*Limpiamos el formulario*/
        formIniciarSesion.reset();

    });

    const realizarLogin = (settings) =>{
        console.log(settings);
        console.log("Comienza el FETCH");

        fetch(`${url}/usuarios/login`, settings)
        .then(response =>{
            if (response.ok) return response.json();
            /*Forzamos el return para pasar el response al catch*/
            return Promise.reject(response);
        })
        .then(data => {
            console.log("Promesa cumplida")
            console.log(data);
            /*TOKEN*/
            console.log(data.jwt);
            if(data.jwt){
                /*Guardamos en el localStorage*/
                localStorage.setItem("jwt", JSON.stringify(data.jwt));

                /*Redirigimos al usuario*/
                location.replace("./index.html");
            }
        })
        .catch(err =>{
            console.log("Promesa rechazada")
            console.error(err.status);
            if(err.status == 400){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Contraseña Incorrecta.",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                });
            }else if(err.status == 404){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El usuario no Existe.",
                    confirmButtonColor: "#456584",
                    confirmButtonBorderColor: "#3e5975",
                    textColor: "#000",
                    background: "#eaeef4",
                });
            }else{
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

    }

});
