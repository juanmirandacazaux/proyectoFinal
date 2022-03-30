// Declaramos la url del archivo JSON local
const URLJSON = "data/data.json"

//Agregamos un botón con jQuery
$(".nuestraFlota").prepend('<button class="btn btn-primary" id="mostrarProductos">Mostrar Vehiculos</button>');

//Escuchamos el evento click del botón agregado
$("#mostrarProductos").click(() => {
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos) {
                $(".nuestraFlota").prepend(`
                <div class="col-md-4">
                <div class="vehiculoBoton">
                <img src="${dato.img}" alt="imagenAuto" id="imagenAutos"></img>
                <div class="container">
                <div>MARCA: ${dato.marca}</div>
                <div>MODELO: ${dato.modelo}</div>
                <div>AÑO: ${dato.año}</div>
                </div>
                </div>
                </div>`)
            }
        }
    });
});


