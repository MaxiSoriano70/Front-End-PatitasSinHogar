document.addEventListener('DOMContentLoaded', function(){

    const opcionesDeUsuario = document.querySelector("#opciones-usuario");
    const nombreUsuario = document.querySelector("#nombre-usuario");
    const botonIniciarSesion = document.querySelector("#boton-iniciar-sesion");
    const botonRegistrarse = document.querySelector("#boton-registrarse");
    const botonMisMascotas = document.querySelector("#boton-mis-mascotas");

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario){
        opcionesDeUsuario.style.visibility = 'visible';
        botonMisMascotas.style.visibility = 'visible';
        nombreUsuario.textContent = `${usuario.nombreApellido}`;
        botonIniciarSesion.style.visibility = 'hidden';
        botonRegistrarse.style.visibility = 'hidden';
    }else{
        opcionesDeUsuario.style.visibility = 'hidden';
        botonMisMascotas.style.visibility = 'hidden';
        nombreUsuario.textContent = "";
        botonIniciarSesion.style.visibility = 'visible';
        botonRegistrarse.style.visibility = 'visible';
    }
});