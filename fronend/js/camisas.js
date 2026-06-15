const torso = document.getElementById("torso");
const mangaIzquierda = document.getElementById("mangaIzquierda");
const mangaDerecha = document.getElementById("mangaDerecha");
const cuello = document.getElementById("cuello");

torso.addEventListener("input", () => {

    document
    .getElementById("torsoSvg")
    .setAttribute(
        "fill",
        torso.value
    );

});

mangaIzquierda.addEventListener("input", () => {

    document
    .getElementById("mangaIzquierdaSvg")
    .setAttribute(
        "fill",
        mangaIzquierda.value
    );

});

mangaDerecha.addEventListener("input", () => {

    document
    .getElementById("mangaDerechaSvg")
    .setAttribute(
        "fill",
        mangaDerecha.value
    );

});

cuello.addEventListener("input", () => {

    document
    .getElementById("cuelloSvg")
    .setAttribute(
        "fill",
        cuello.value
    );

});

console.log("Cargando diseños...");
cargarDiseños();

async function cargarDiseños(){

    const respuesta =
    await fetch(
        "https://camisaap.onrender.com"
    );

    const diseños =
    await respuesta.json();

    const lista =
    document.getElementById(
        "listaDiseños"
    );

    lista.innerHTML = "";

    diseños.forEach(c=>{

        lista.innerHTML += `

        <div class="card-diseño">

            <h3>${c.nombre}</h3>

            <p>
                <strong>Autor:</strong>
                ${c.creador}
            </p>

            <p>
                ${c.descripcion}
            </p>

            <svg
                width="120"
                height="140"
                viewBox="0 0 300 320"
            >

                <polygon
                    points="40,60 90,40 90,120 20,130"
                    fill="${c.mangaIzquierda}"
                />

                <polygon
                    points="210,40 260,60 280,130 210,120"
                    fill="${c.mangaDerecha}"
                />

                <rect
                    x="90"
                    y="40"
                    width="120"
                    height="220"
                    rx="10"
                    fill="${c.torso}"
                />

                <ellipse
                    cx="150"
                    cy="55"
                    rx="25"
                    ry="12"
                    fill="${c.cuello}"
                />

            </svg>

        </div>

        `;

    });

}

async function guardarCamiseta() {

    const token =
    localStorage.getItem("token");

    if (!token) {

        alert(
            "Debes iniciar sesión"
        );

        return;
    }

    const nombre =
    document.getElementById(
        "nombreDiseno"
    ).value;

    const descripcion =
    document.getElementById(
        "descripcion"
    ).value;

    const respuesta =
    await fetch(
        "https://camisaap.onrender.com",
        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json",

                "Authorization":
                "Bearer " + token

            },

            body: JSON.stringify({

                nombre,

                descripcion,

                torso:
                torso.value,

                mangaIzquierda:
                mangaIzquierda.value,

                mangaDerecha:
                mangaDerecha.value,

                cuello:
                cuello.value

            })

        }
    );

    const data =
    await respuesta.json();

    console.log(data);

    alert(
        "Diseño guardado correctamente"
    );

}

async function eliminarDiseño(id){

    const token =
    localStorage.getItem(
        "token"
    );

    const respuesta =
    await fetch(

        "https://camisaap.onrender.com"+id,

        {
            method:"DELETE",

            headers:{
                Authorization:
                "Bearer "+token
            }
        }

    );

    const data =
    await respuesta.json();

    alert(
        data.mensaje
    );

    cargarDiseños();

}

function editarDiseño(id){

    localStorage.setItem(
        "camisetaEditar",
        id
    );

    window.location =
    "editar.html";

}
function obtenerPayloadJWT(token){

    const base64 =
    token.split(".")[1];

    return JSON.parse(
        atob(base64)
    );

}