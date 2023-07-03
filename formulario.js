const formulario = document.getElementById("formulario")
const inputUser = document.getElementById("input-user")
const inputEmail = document.getElementById("input-email")
const inputPassword = document.getElementById("input-password")


let usuarioAInscribirse = {user:"", email:"", password: ""}


formulario.addEventListener("submit", (e) =>{
    e.preventDefault

 usuarioAInscribirse = {
    ...usuarioAInscribirse,
    user: inputUser.value,
    email: inputEmail.value,
    password: inputPassword.value
}

if(!usuarioAInscribirse.user || !usuarioAInscribirse.email || !usuarioAInscribirse.password){
    alert("Faltan datos por agregar")
} else{
    alert("Bienvenido a StreamingSpot Premium! Todo lo que buscas esta aqui!")
}
})



