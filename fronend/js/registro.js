async function registrar(){

const respuesta = await fetch(
"https://camisaap.onrender.coms",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

nombre:
document.getElementById("nombre").value,

correo:
document.getElementById("correo").value,

clave:
document.getElementById("clave").value

})
});

const data = await respuesta.json();

alert(data.mensaje || "Usuario creado");
}