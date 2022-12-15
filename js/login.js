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

const inputMailLogin = document.getElementById("emailIngresado");

const inputPassLogin = document.getElementById("passIngresada");

const checkRemember = document.getElementById("recordar");

const btnLogin = document.getElementById("login");

const modalEl = document.getElementById("myModal");

const modal = new bootstrap.Modal(document.getElementById("myModal"));

const contTarjetas = document.getElementById("tarjetas");

const elementosToggleables = document.querySelectorAll(".toggeable");

const btnLogout = document.getElementById("logout");

const isLogged = localStorage.getItem("usuario");

if (isLogged) {
  document.getElementById("logout").classList.remove("d-none");
} else {
  document.getElementById("logout").classList.add("d-none");
}

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

function presentarInfo(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}

//Esta función revisa si hay un usuario guardado en el storage, y en ese caso evita todo el proceso de login
function estaLogueado(usuario) {
  if (usuario) {
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
      location.reload();

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