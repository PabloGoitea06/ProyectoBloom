

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



  



const nombreYApellido = document.getElementById("name");
const emailFormu = document.getElementById("email");
const resultFormu = document.getElementById("areadetexto");
const conformidad = document.getElementById("selector");
const btnLogueo = document.getElementById("btnEnviar");
