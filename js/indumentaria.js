
fetch("../jsons/indumentaria.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((prod, index) => {
      let div = document.createElement("div");
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
    localStorage.setItem("indumentaria", JSON.stringify(data));
  })
  .catch((error) => {
    console.log(error);
    throw error;
  });


  function removerDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.precioTotal -= carrito.productos[index].precio;
    carrito.productos.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoHandler();
  }
  
  function agregarAlCarrito(index) {
    const productos = JSON.parse(localStorage.getItem("indumentaria"));
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