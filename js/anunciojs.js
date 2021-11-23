let anuncios = [];
const URL = "http://localhost:3000/anuncios";

window.addEventListener("DOMContentLoaded", () => {

	//AJAX	
	getDatosAjax((datos) => {
        anuncios = datos;
        crearArticulo(anuncios);
    });	
});


/**
 * Obtener info con ajax
 */
const getDatosAjax = (callback) => {

	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const datos = JSON.parse(xhr.responseText);
                callback(datos);
            } else {
                const statusText = xhr.statusText || "Ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
        } else {
        }
	};
	xhr.open("GET", URL);
	xhr.send();
};


//#region crear anuncios 


const crearArticulo = (data) => {

	const div = document.getElementById("divAnuncios");
    data.forEach(element => {

		const card1 = "<div class='row'>";
		const card2 = "<div class='row cards' style='width: auto; margin: auto auto;'>";
		const card3 = "<div class='card bg-light' style='width: 15rem;'>"
		const card4 = " <div class='card-body'>"
		const titulo = "<h5 class='card-title'>" + element.titulo + "</h5>" + "<i class='fas fa-car-side'></i>";
		const descripcion = "<p class='card-text'>" + element.descripcion + "</p>";
        const precio = "<p>Precio: " + element.precio + "$</p>";
		const puertas = "<p><i class='fas fa-door-open' aria-hidden='true'></i> Puertas: " + element.puertas + "</p>";
		const km = "<p> <i class='fa fa-tachometer' aria-hidden='true'></i>Km: " + element.kms + "</p>";
		const potencia = "<p>  <i class='fas fa-bolt' aria-hidden='true'></i>Potencia: " + element.potencia + "</p>";
		const link = "<a href='#' class='btn btn-primary'>Ver vehículo</a>";
		const cerrarDiv = "</div></div></div></div>";
		div.innerHTML += card1 + card2 + card3 + card4 + titulo + descripcion + precio + puertas + km + potencia + link + cerrarDiv;
    });
	return div;
}

//#endregion