document.getElementById("bodyTable").innerHTML = "";
const productosCarritoFinal = JSON.parse(localStorage.getItem("carrito"));
if (productosCarritoFinal) {
  productosCarritoFinal.productos.forEach((prod, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("item-container");
    tr.innerHTML = `
      <td scope="row" id="nombreProductoFinal"><img src="${prod.imagen}"/></td>
      <td scope="row" id="nombreProductoFinal">${prod.nombre}</td>
      <td scope="row" id="precioProductoFinal">${prod.precio}</td>
      <td scope="row" id="botonRemover"><button class="btn btn-danger" onclick="removerDelCarrito(${index})">Eliminar</button></td>
    `;
    document.getElementById("bodyTable").appendChild(tr);
  });
};

function removerDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.precioTotal -= carrito.productos[index].precio;
    carrito.productos.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoHandler();
    window.location.reload();
    
  }
  
function agregarAlCarrito(index) {
  const productos = JSON.parse(localStorage.getItem("accesorios"));
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
