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

function removerDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.precioTotal -= carrito.productos[index].precio;
  carrito.productos.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  carritoHandler();
}

function agregarAlCarrito(index) {
  const productos = JSON.parse(localStorage.getItem("productos"));
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito) {
    carrito.productos.push(productos[index]);
    carrito.precioTotal += productos[index].precio;
  } else {
    carrito = {};
    carrito.productos = [productos[index]];
    carrito.precioTotal = productos[index].precio;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

fetch("./js/data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((prod, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="col-xl-6">
          <div class="card" id="tarjetas" style="width: 18rem;">
            <img class="card-img-top" src="${prod.imagen}" alt="Imagen">
              <div class="card-body">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">Precio: $${prod.precio}</p>
                <p class="card-text">Categoria: ${prod.categoria}</p>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${index})">Comprar</button>
              </div>
          </div>
        </div>
      `;
      document.getElementById("productContainer").appendChild(div);
    });
    localStorage.setItem("productos", JSON.stringify(data));
  })
  .catch((error) => {
    console.log(error);
    throw error;
  });

  

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

const cartModal = document.getElementById("exampleModal");
const carritoHandler = () => {
  document.getElementById("cartContainer").innerHTML = "";
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito) {
    carrito.productos.forEach((prod, index) => {
      const div = document.createElement("div");
      div.classList.add("item-container");
      div.innerHTML = `
          <div class="div-img">
            <img class"imagen-chiquita" src="${prod.imagen}" alt="Imagen">
          </div>
          <div class="div-texto">
            <h5 >${prod.nombre}</h5>
            <p>Precio: $${prod.precio}</p>
            <p>Categoria: ${prod.categoria}</p>
            <div class="div-boton">
              <button class="btn btn-danger" onclick="removerDelCarrito(${index})">Eliminar</button>
            </div>
            <br><br>
          </div>
      `;
      document.getElementById("cartContainer").appendChild(div);
    });
    document.getElementById("totalPrice").innerHTML = carrito.precioTotal;
  }
};
cartModal.addEventListener("shown.bs.modal", carritoHandler);
window.onunload = function () {
  cartModal.removeEventListener("shown.bs.modal", carritoHandler);
  return;
};

const nombreYApellido = document.getElementById("name");
const emailFormu = document.getElementById("email");
const resultFormu = document.getElementById("areadetexto");
const conformidad = document.getElementById("selector");
const btnLogueo = document.getElementById("btnEnviar");


function productosAgregados(index){
  const productosFinales = JSON.parse(localStorage.getItem("carrito"));
  }