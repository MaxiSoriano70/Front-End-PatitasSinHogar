const cerrarSesion = () =>{
    Swal.fire({
        title: "Cerrar sesión",
        text: "¿Estás seguro de que deseas cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#456584",
        confirmButtonBorderColor: "#3e5975",
        cancelButtonColor: "#dc3545",
        textColor: "#000",
        background: "#eaeef4",
        confirmButtonText: "Si, cerrar sesión",
        cancelButtonText : "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "¡Adiós!",
            text: "Recuerda cuidar a tus mascotas.",
            icon: "success",
            confirmButtonColor: "#456584",
            confirmButtonBorderColor: "#3e5975",
            textColor: "#000",
            background: "#eaeef4",
            });
        }
    });
}

const eliminarMascota = () =>{
    Swal.fire({
        title: "Eliminar mascota",
        text: "¿Estás seguro de que deseas eliminar esta mascota?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#456584",
        confirmButtonBorderColor: "#3e5975",
        cancelButtonColor: "#dc3545",
        textColor: "#000",
        background: "#eaeef4",
        confirmButtonText: "Si, eliminar",
        cancelButtonText : "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "¡Eliminado con exito!",
            text: "Recuerda cuidar a tus mascotas.",
            icon: "success",
            confirmButtonColor: "#456584",
            confirmButtonBorderColor: "#3e5975",
            textColor: "#000",
            background: "#eaeef4",
            });
        }
    });
}