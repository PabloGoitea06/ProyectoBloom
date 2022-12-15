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



