
//capturo el elemento productContainer de HTML para luego crear los objetos en las cards que se mostraran en el HTML

let productContainer = document.getElementById("productContainer")
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById("modal-container");
const cantidadCarrtio = document.getElementById("cantidad-carrito");



let carrito = JSON.parse(localStorage.getItem("carrito")) || []



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

    botonAgregarCarrito.addEventListener("click", ()=>{ 

      //ver si el producto se repite:

      const productoRepetido = carrito.some ((repetido)=> repetido.id === elementoTienda.id);
      //test productoRepetido:
      console.log(productoRepetido);

      //Agregar cantidad al carrito:

      if(productoRepetido){
        carrito.map((prod)=>{
          if (prod.id === elementoTienda.id){
            prod.cantidad++
          }
        });
      }else{
      carrito.push({
      id:elementoTienda.id,
      nombre: elementoTienda.nombre,
      img: elementoTienda.img,
      precio: elementoTienda.precio,
      stock: elementoTienda.cantidad,
      cantidad: 1
    });
    }

    
    //test agregar carrito:
    console.log(carrito)
    contadorCarrito()
    guardarLocalStorage()

    Swal.fire({
      icon: 'success',
      title: 'Producto fue gregado al Carrito',
      text: 'Gracias!',
      
    })
  })

})



})


const funcionCarrito = ()=> {

 //este innerHTML evita que se repita el carrito muchas veces

  modalContainer.innerHTML = "";

  modalContainer.style.display = "flex"
  

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

botonCarrito.addEventListener("click", ()=>{
  modalContainer.style.display = "none";
})

//body

carrito.forEach((elementoTienda)=>{
  
  let carritoContent = document.createElement("div")
      carritoContent.className = "modal-content"
      carritoContent.innerHTML =

      `
      <img src="${elementoTienda.img}">
      <h5>${elementoTienda.nombre}</h5>
      <p>${elementoTienda.precio}</p>
      <p> Unidades: ${elementoTienda.cantidad}</p>
      <p> Total por Producto: ${elementoTienda.cantidad * elementoTienda.precio}</p>
      `;

      modalContainer.append(carritoContent)
      console.log(carrito.length);

      //botón para eliminar productos

    const eliminarProducto = document.createElement("Span")
        eliminarProducto.innerHTML =
        `<button type="button" class="btn btn-secondary btn-sm">Borrar Producto</button>`
        eliminarProducto.className ="eliminarProducto"

        carritoContent.append(eliminarProducto)

        eliminarProducto.addEventListener("click", eliminarProductoCarrito);

       


  //footer

  //reduce calcula precio
  


})

calcularTotal()  
}

verCarrito.addEventListener("click", funcionCarrito);

const  eliminarProductoCarrito = ()=>{

  const buscarPruductoId = carrito.find((el)=>el.id);

  carrito = carrito.filter((carritoId)=>{
    return carritoId !== buscarPruductoId
  });
  contadorCarrito()
  funcionCarrito()
  guardarLocalStorage()

  Swal.fire({
    icon: 'error',
    title: 'Eliminaste un Producto',
    
  })
}

//Nro indidador de la cantidad de Productos en el Carrito:

const contadorCarrito = ()=>{
  cantidadCarrtio.innerHTML = JSON.parse(localStorage.getItem("carritolength"));

  const carritolength = carrito.length;
  localStorage.setItem("carritolength", JSON.stringify(carritolength));
}

//Guardar local storage
const guardarLocalStorage = ()=>{
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function calcularTotal(){
  const totalCarrito = carrito.reduce((acumulador, el)=> acumulador += el.precio * el.cantidad, 0);

  const totalCompra = document.createElement("div")
  totalCompra.className ="modal-fotter"
  totalCompra.innerHTML = `
      <p>"El total de tu compra es: ${totalCarrito}"S</p>
  `;
  modalContainer.append(totalCompra)
}

contadorCarrito()








