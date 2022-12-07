const usuarios = [
  {
    nombre: "Braian",
    mail: "braianfernandez@gmail.com",
    pass: "brfr134",
  },
  {
    nombre: "Cintia",
    mail: "cintiarodriguez@gmail.com",
    pass: "160596",
  },
  {
    nombre: "Mirta",
    mail: "mirtabeatriz@gmail.com",
    pass: "mirtabz123",
  },
];

const productos = [
  {
    nombre: "Boina Negra",
    precio: "$1200",
  },
  {
    nombre: "Boina Cuadrille",
    precio: "$1000",
  },
  {
    nombre: "Pollera negra",
    precio: "$1500",
  },
  {
    nombre: "Boina Pink",
    precio: "$1100",
  },
];

const inputMailLogin = document.getElementById("emailIngresado");

const inputPassLogin = document.getElementById("passIngresada");

const checkRemember = document.getElementById("recordar");

const btnLogin = document.getElementById("login");

const modalEl = document.getElementById("myModal");

const modal = new bootstrap.Modal(document.getElementById("myModal"));

const contTarjetas = document.getElementById("tarjetas");

const elementosToggleables = document.querySelectorAll(".toggeable");

const btnLogout = document.getElementById("logout");

function validarUsuario(usersDB, mail, pass) {
  let encontrado = usersDB.find((userDB) => userDB.mail == mail);
  console.log(encontrado);

  if (typeof encontrado === "undefined") {
    return false;
  } else {
    if (encontrado.pass != pass) {
      return false;
    } else {
      return encontrado;
    }
  }
}

function guardarDatos(usuarioDB, storage) {
  const usuario = {
    name: usuarioDB.nombre,
    user: usuarioDB.mail,
    pass: usuarioDB.pass,
  };

  storage.setItem("usuario", JSON.stringify(usuario));
}

function borrarDatos() {
  localStorage.clear();
  sessionStorage.clear();
}

function recuperarUsuario(storage) {
  return JSON.parse(storage.getItem("usuario"));
}

function mostrarInfoProducto(array) {
  contTarjetas.innerHTML = "";

  array.forEach((element) => {
    let html = `<div class="card cardProducto" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="${element.nombre}"> Nombre: ${element.nombre}  
                </h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoProducto"></img>
                <div class="card-body">
                    <p class="card-text" id="Precio${element.precio}">Precio: ${element.precio}</p>
                </div>
            </div>`;

    contTarjetas.innerHTML += html;
  });
}

function presentarInfo(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

//Esta función revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login
function estaLogueado(usuario) {
  if (usuario) {
    mostrarInfoProducto(productos);
    presentarInfo(elementosToggleables, "d-none");
  }
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  if (!inputMailLogin.value || !inputPassLogin.value) {
    alert("Todos los campos son requeridos");
  } else {
    let data = validarUsuario(
      usuarios,
      inputMailLogin.value,
      inputPassLogin.value
    );
    if (!data) {
      alert("Usuario y/o contraseña erróneos");
    } else {
      if (checkRemember.checked) {
        guardarDatos(data, localStorage);
        recuperarUsuario(localStorage);
      } else {
        guardarDatos(data, sessionStorage);
        recuperarUsuario(sessionStorage);
      }
      modal.hide();

      mostrarInfoProducto(productos);
      presentarInfo(elementosToggleables, "d-none");
    }
  }
});

btnLogout.addEventListener("click", () => {
  borrarDatos();
  presentarInfo(elementosToggleables, "d-none");
});

window.onload = () => {
  estaLogueado(recuperarUsuario(localStorage));
};

const nombreYApellido = document.getElementById("name");
const emailF= document.getElementById("email");
const resultF = document.getElementById("areadetexto");
const conformidad = getElementById("selector");
const btnLogueo = document.getElementById("btnEnviar");

/*
para cuando el carrito esta vacio podemos usar :

const carrito: [];

carrito.length === 0 && alert ('carrito vacío');

*/


document.getElementById("btnEnviar").onsubmit = function() {
  var email = document.getElementById("name").value
  var subject = document.getElementById("email").value
  var body = document.getElementById("areadetexto").value

  window.open('mailto:'+ email +'?subject='+ subject +'&body='+body );
}


