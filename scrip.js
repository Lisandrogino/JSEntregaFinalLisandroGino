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



let carrtioDeCompras = []


//compruebo a modo de test los objetos que compone el array

//console.log(productosTienda)

//capturo el elemento productContainer de HTML para luego crear los objetos en las cards que se mostraran en el HTML

let productContainer = document.getElementById("productContainer")




// test para ver que está capturando

//console.log(productContainer)

//IMPORTANTE: se debe crear un forEach que recorra el array y cree el elemento por medio del innerHTML

fetch('data.json')
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
        <button id="botonAgregarCarrito" "class=btn btn-secondary m-2 type="button">Agregar al Carrito</button>
        </div>
    </div>
  </div>
    `

    // IMPORTANTE productContainer - representa el elemento en el HTML - y el elemento dentro del paréntesis es ele elemento creado en este caso el DIV que contiene cadatarjeta.
    productContainer.append(contenedor)

    let botonAgregarCarrito = document.getElementById("botonAgregarCarrito")

    botonAgregarCarrito.addEventListener("click", agregarCarrito)

})



})




function agregarCarrito(){
    //test
    console.log("agregado al carrito")

    carrtioDeCompras.push()

    //test carrito de compras push
    console.log(carrtioDeCompras)
    console.log(carrtioDeCompras.length)

    
    
}





