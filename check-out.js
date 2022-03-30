// Checkout

function cantidadDias(entrega,devolucion){
    const dia = 24*60*60*1000
    const resultado = Math.round(Math.abs((devolucion-entrega)/dia))
    console.log(resultado);
}



let carritoLocal = JSON.parse(localStorage.getItem("carritoLocal"));

let parseFechaDevol = carritoLocal.fechaDevol.split("-")


let fechaDevol = new Date(parseFechaDevol[0],parseFechaDevol[1],parseFechaDevol[2])


let parseFechaEntrega = carritoLocal.fechaEntrega.split("-")

let fechaEntrega = new Date(parseFechaEntrega[0],parseFechaEntrega[1],parseFechaEntrega[2])

const fechaResultadoDevol = fechaDevol.getTime();


const fechaResultadoEntrega = fechaEntrega.getTime();



const sumarDias = (fechaResultadoDevol - fechaResultadoEntrega) / 1000 / 60 / 60 / 24
const subTotal = carritoLocal.producto.precio*sumarDias
const iva = subTotal * 22 / 100
const total = subTotal + iva




let productoSeleccionados = $("#productoSeleccionados")
$(document).ready(function () {
    productoSeleccionados.append(`
<div class="vehiculoBoton">
            <img src=${carritoLocal.producto.img} alt="imagenAuto" id="imagenAutos"></img>
            <div id="contenedorAutos">
                <div>Marca: ${carritoLocal.producto.marca} </div>
                <div>Modelo: ${carritoLocal.producto.modelo} </div>
                <div>Fecha entrega: ${carritoLocal.fechaEntrega}</div>
                <div>Fechas devolucion: ${carritoLocal.fechaDevol}</div>
                <div>Sub Total: U$S ${subTotal}</div>
                <div>Iva: U$S ${iva}</div>
                <div>Precio Total: U$S ${total}</div>
            </div>
        </div>
        `)
})




$(function () {
    $("#validarDatos").click(() => {
      $("#confirm").slideToggle("slow");
    });
  })

