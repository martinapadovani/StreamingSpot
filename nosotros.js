const novedades = document.getElementById("novedades")
const inputEmail = document.getElementById("input-email")   


let usuarioAInscribirse = { email:""}


novedades.addEventListener("submit", (e) =>{
    e.preventDefault

usuarioAInscribirse = {
    ...usuarioAInscribirse,
    email: inputEmail.value,

}
if( !usuarioAInscribirse.email ){
    alert("Datos incompletos!")
} else{
    alert("Gracias por dejarnos tu mail! Recibiras informacion exclusiva sobre nuestra plataforma.")
}
})
