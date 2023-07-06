const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById("modal-container")

//console.log("hola, funciono de 10...!!!!")

// class Producto

//class Producto{

  //  constructor(id, tipoProducto, nombre, descripcion, imagen, precio) {
    //    this.id=id
      //  this.tipoProducto = tipoProducto
        //this.nombre = nombre;
        //this.descripcion = descripcion;
        //this.img = imagen
        //this.precio = precio;
        
    //}

//}

// array de objetos con las propiedades de la class Producto



let carrito = []


//compruebo a modo de test los objetos que compone el array

//console.log(productosTienda)

//capturo el elemento productContainer de HTML para luego crear los objetos en las cards que se mostraran en el HTML

let productContainer = document.getElementById("productContainer")




// test para ver que está capturando

//console.log(productContainer)

//IMPORTANTE: se debe crear un forEach que recorra el array y cree el elemento por medio del innerHTML

fetch('../data.json')
.then((res)=>res.json())
.then((data)=>{

  data.forEach((elementoTienda)=>{

    //test para ver que está recorriendo

   console.log(elementoTienda)
   console.log(elementoTienda.nombre)

    let contenedor = document.createElement("div")

    contenedor.innerHTML = `
    
    <div class="col">
    <div class="card">
      <img src="${elementoTienda.img}" class="card-img-top" alt="producto tienda">
      <div class="card-body">
        <p class="card-identificador">Identificador: ${elementoTienda.id} </p>
        <h5 class="card-title">${elementoTienda.nombre}</h5>
        <p class="card-tipoProducto">${elementoTienda.tipoProducto}</p>
        <p class="card-text">${elementoTienda.descripcion}</p>
        <h6 class="card-precio"><strong>Precio:<strong></h6>
        <h3 class="card-tipoProducto">${elementoTienda.precio}</h3>
      </div>
        <div class="d-grid gap-2 col-6 mx-auto">
        <button id="botonAgregarCarrito-${elementoTienda.id}" "class=btn btn-secondary m-2 type="button">Agregar al Carrito</button>
        </div>
    </div>
  </div>
    `

    // IMPORTANTE productContainer - representa el elemento en el HTML - y el elemento dentro del paréntesis es ele elemento creado en este caso el DIV que contiene cadatarjeta.
    productContainer.append(contenedor)

    let botonAgregarCarrito = document.getElementById(`botonAgregarCarrito-${elementoTienda.id}`)

    botonAgregarCarrito.addEventListener("click", ()=>{ carrito.push({
      tipoProducto: elementoTienda.tipoProducto,
      img: elementoTienda.img,
      precio: elementoTienda.precio
    })
    console.log(carrito)
  })

})



})


verCarrito.addEventListener("click", ()=>{

  //test
  console.log("estoy escuchando")

  //header

  const modalHeader = document.createElement("div")
  modalHeader.className = "modal-header"
  modalHeader.innerHTML =
  `<h2 class="modalTile">Carrito de Compas</h2>`;

  modalContainer.append(modalHeader)
  
const botonCarrito = document.createElement("div");

botonCarrito.innerHTML=
`<button type="button" class="btn btn-secondary">Cerrar Carrito</button>`;
modalHeader.append(botonCarrito)

//body

carrito.forEach((elementoTienda)=>{
  
  let carritoContent = document.createElement("div")
  carritoContent.className = "modal-content"
  carritoContent.innerHTML =

  `
   <img src="${elementoTienda.img}">
   <h4>${elementoTienda.nombre}</h4>
   <p>${elementoTienda.precio}
  `;

  modalContainer.append(carritoContent)

  //footer

  //reduce calcula precio
  const totalCarrito = carrito.reduce((acumulador, el)=>{ acumulador + el.precio, 0});

  const totalCompra = document.createElement("div")
  totalCompra.className ="modal-fotter"
  totalCompra.innerHTML = `
      <p>"El total de tu compra es: ${totalCompra}"</p>
  `;
  modalContainer.append(totalCompra)


})

  
})







