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

/*BUSCAR USUARIO PARA LOGIN*/
const buscarUsuario = (payload) => {
    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.email === payload.email && usuario.contrasenia === payload.password
    );
    return usuarioEncontrado || null;
};