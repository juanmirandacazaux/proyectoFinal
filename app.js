// A la carga del documento si no existe ya (de una sesion previa) el elemento 'carrito' en localStorage, lo creo. Luego lo guardo en la variable carritoLocal

document.addEventListener("DOMContentLoaded", (event) => {
  if (!localStorage.carritoLocal) {
    console.log("No existe")
    localStorage.setItem("carritoLocal", JSON.stringify({}));
  }

  // Guardo el objeto en una variable, con ella puedo usar sus valores para cargarlos por defecto en los input, o en caso que quiera mostrar el carrito en otra pantalla (otro archivo). Esto es la Continuacion para la entrega 3.
  let carritoLocal = JSON.parse(localStorage.getItem("carritoLocal"))
})



// Creamos el molde constructor y sus metodos

class Producto {
  constructor(id, marca, modelo, año, precio, img) {
    this.id = id;
    this.marca = marca.toUpperCase();
    this.modelo = modelo.toUpperCase();
    this.año = año;
    this.precio = precio;
    this.img = img;

  }
  
  cambiarCondicion() {
    this.alquilado = true;
  }


}


// Crea un arrary de productos

const productos = [
  new Producto(1, "zuzuki", "swift", "2019", 55, "./img/suzukiSwift.png"),
  new Producto(2, "chevrolet", "onix", "2019", 47, "./img/chevroletOnix.png"),
  new Producto(3, "fiat", "uno", "2018", 44, "./img/fiatUno.png"),
  new Producto(4, "volkswagen", "polo", "2020", 60, "./img/volkswagenPolo.png"),
  new Producto(5, "nissan", "versa", "2020", 68, "./img/nissanVersa.png"),
  new Producto(6, "renault", "sandero", "2020", 65, "./img/renaultSandero.png"),
  new Producto(7, "hyundai", "hb20", "2021", 80, "./img/Hb20.png"),
  new Producto(8, "volkswagen", "up", "2019", 48, "./img/volkswagenUp.png"),
  new Producto(9, "renault", "kwid", "2020", 50, "./img/renaultKwid.png"),
  new Producto(10, "toyota", "eitos", "2020", 83, "./img/toyotaEitos.png"),
  new Producto(11, "nissan", "kicks", "2019", 90, "./img/nissanKicks.png"),
  new Producto(12, "citroen", "c1", "2018", 49, "./img/citroenC1.png"),
  new Producto(13, "ford", "focus", "2019", 72, "./img/fordFocus.png"),
  new Producto(14, "chevrolet", "captiva", "2020", 92, "./img/chevroletCaptiva.png"),
  new Producto(15, "ford", "fiesta", "2019", 56, "./img/fordFiesta.png")

]


// Crear una clase para el carrito

class Carrito {
  constructor(producto, lugarEntrega, lugarDevolucion, fechaEntrega, fechaDevol) {
    this.producto = producto;
    this.lugarEntrega = lugarEntrega;
    this.lugarDevolucion = lugarDevolucion;
    this.fechaEntrega = fechaEntrega;
    this.fechaDevol = fechaDevol;
  }
}

// Crear una instancia del carrito con los valores vacíos (se añadirán más adelante)

let carrito = new Carrito();


// Creamos una funcion para que genere un evento

function getDate() {
  elegirFecha = document.getElementsByClassName("calendar").value

}

let boton = document.getElementById("boton")
boton.addEventListener('click', buscarVehiculo)


// Agregamos un metodo para mostrar mensaje "Mensaje error"

function mostrarMensaje(message, cssClass) {
  const div = document.createElement("div");
  div.className = `alert alert-${cssClass} mt-2`;
  div.appendChild(document.createTextNode(message));

  // Mostramos en el DOM
  const app = document.querySelector("#mensajeFormulario");

  app.innerHTML = `<div class="alert alert-${cssClass} mt-2 ">${message}</div>`

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}

function buscarVehiculo() {
  let lugarEntrega = document.getElementById("lugarEntrega").value;
  let lugarDevolucion = document.getElementById("lugarDevol").value;
  let fechaEntrega = document.getElementById("fechaEntrega").value;
  let fechaDevol = document.getElementById("fechaDevol").value;

  let parseFechaDevol2 = fechaDevol.split("-")


let fechaDevol2 = new Date(parseFechaDevol2[0],parseFechaDevol2[1],parseFechaDevol2[2])


let parseFechaEntrega2 = fechaEntrega.split("-")

let fechaEntrega2 = new Date(parseFechaEntrega2[0],parseFechaEntrega2[1],parseFechaEntrega2[2])

const fechaResultadoDevol = fechaDevol2.getTime();


const fechaResultadoEntrega = fechaEntrega2.getTime();

if((fechaResultadoDevol-fechaResultadoEntrega) < 0){
    alert("Fecha de devolucion superior")
    window.location.href="./index.html"
}






  if (lugarEntrega !== "" && lugarDevolucion !== "" && fechaEntrega !== "" && fechaDevol !== "") {
    let vehivulosInicio = document.getElementById("vehivulosInicio")
    vehivulosInicio.style.display = "block"

    // Guardo los datos en mi objeto carrito, aún falta guardar el producto
    carrito.lugarEntrega = lugarEntrega;
    carrito.lugarDevolucion = lugarDevolucion;
    carrito.fechaEntrega = fechaEntrega;
    carrito.fechaDevol = fechaDevol;

    // Mando los valores actuales a mi carrito guardado en localStorage
    localStorage.setItem("carritoLocal", JSON.stringify(carrito))

    // Muestro en consola el carrito de localStorage
    console.log(JSON.parse(localStorage.getItem("carritoLocal")))

    // Creo evento de click para el boton
    let btnReserva = document.querySelectorAll(".vehiculoBoton .btn");

    btnReserva.forEach(btn => {
      btn.addEventListener("click", (event) => {
        // Con el método find encuentro el auto que corresponde al data-id del botón que está haciendo click (event.target). El parseInt() es para que lo convierta a número, sino no lo encuentra.
        let autoElegido = productos.find(auto => auto.id === parseInt(event.target.dataset.id));

        // Agrego el auto elegido al carrito, en la propiedad producto que había quedado vacía. 
        carrito.producto = autoElegido;

        // Actualizo la información de nuestro carrito en localStorage. Ahora tengo en el carrito de localStorage toda la información necesaria para mostrar la siguiente pantalla
        localStorage.setItem("carritoLocal", JSON.stringify(carrito))
        console.log(JSON.parse(localStorage.getItem("carritoLocal")))
      })
    })


  } else {
    mostrarMensaje("ERROR: Completar los datos para poder buscar vehiculos", "danger");
  }


}


// Insertamos los productos por DOM

const destino = document.getElementById("principal");

const fragment = document.createDocumentFragment();


for (let i = 0; i < productos.length; i++) {
  let div = document.createElement("div");
  div.classList.add("col-md-4");
  div.id = "contenedorImagen";
  div.innerHTML = `
    <div class="vehiculoBoton">
    <img src="${productos[i].img}" alt="imagenAuto" id="imagenAutos"></img>
    <div class="container">
    <div>Marca: ${productos[i].marca}</div>
    <div>Modelo: ${productos[i].modelo}</div>
    <div>Precio por día: U$D ${productos[i].precio}</div>
    </div>
    <a href="./check-out.html"><button id="botonReserva" role="button" type="submit" class="btn btn-primary" data-id="${productos[i].id}">Reservar</button></a>
    </div>
  `;
  fragment.appendChild(div)
}

destino.appendChild(fragment);


// Creamos DOM con JQuery

$('.nosotros').append(`
  <div><h2 class="titulo" >QUIENES SOMOS</h2>
  <p class="textoNosotros" style="display:none">
  Tenemos la mayor infraestructura en todo el territorio nacional con una red de oficinas propias en todo el país. 
  Nuestro taller central de mecánica de 5.000 mts2, está certificado con normas de calidad ISO 9001/2000, y contamos con talleres en todo el país, lo que garantiza aún más una cobertura total. 
  Ofrecemos servicio de auxilio propio 24 horas, 365 días con camiones especializados y totalmente equipados para la inmediata asistencia a nuestros clientes.
  Contamos con un equipo humano que hace a la esencia y desarollo de la empresa. También, nos dedicamos al servicio y la gestión de flota de nuestros clientes, 
  ¡brindando un servicio de calidad y excelencia!
  <br>
   </p>
  <button class="btn btn-primary mostrar">Mostrar</button>`);
;


// Agregamos CSS con JQuery

$(".titulo").css({ 
  "color": "#087F99",
  "font-size": "50px",
  "font-weight": "800"
});

$(".textoNosotros").css({ 
  "width": "75%",
  "margin": "25px auto",
  "margin-top": "40px"
});

$(".mostrar").css({ 
  "border-radius": "10px",
  "margin-bottom": "50px",
  "margin-top": "40px",
  "background-color": "#FF630B",
  "color": "white"
});


// Creamos un evento animado utilizando JQuery


$(function () {
  $(".mostrar").click(() => {
    $(".textoNosotros").slideToggle("slow");
  });
})


// Creamos una alerta utilizando JQuery


$(function () {


  $(".textoNavBar").click(function () {
    swal("Estamos construyendo estas paginas 💻🔧");
  })


});
  




