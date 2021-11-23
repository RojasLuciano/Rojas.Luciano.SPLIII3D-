import Anuncio_Auto from "./anuncio_auto.js";

let anuncios = [];
let listaTemporal;

//#region spinner
const divSpinner = document.querySelector(".spinner");
  const getSpinner = () => {
      const spinner = document.createElement("img");
      spinner.setAttribute("src", "./assets/spinner.gif");
      spinner.setAttribute("alt", "loader");
      divSpinner.style.display = "flex";
      return spinner;
  };
  const clearDivSpinner = () => {
      while (divSpinner.hasChildNodes()) {
          divSpinner.removeChild(divSpinner.firstChild);
      }
      divSpinner.style.display = "none";
  };
//#endregion

//#region variables y botones
const URL = "http://localhost:3000/anuncios";
const frm = document.forms[0];
const btnGuardar = document.getElementById("btnGuardar");
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const cmbTrsns = document.getElementById("transaccion");
const txtProm = document.getElementById("promedio");
const checkBox = document.querySelectorAll(".check");
//#endregion variables y botones

//#region Formulario y sus funciones

//filter //reduce
function handlerFiltro(e) {
	let sel = cmbTrsns.value;
	let resultado = 0;
	if (sel != "todos") 
	{
		listaTemporal = anuncios.filter(value => value.transaccion == sel);
	} else {
		listaTemporal = anuncios;
	}
	 resultado = listaTemporal.reduce(function (acc,  element) { return acc + parseInt(element.precio); }, 0);

	if (listaTemporal.length > 0) {
		txtProm.value = (resultado / listaTemporal.length).toFixed(1);
	}
	renderizarTable(createTable(listaTemporal), document.getElementById("divTabla")); 
}
//map
function handleCheck(e) {
	const filtrosSeleccionados = {};
	checkBox.forEach((item) => {
		filtrosSeleccionados[item.name] = item.checked;
	});
	const listaMap = listaTemporal.map((item) => {
		const listaMapeada = {};
		for (const key in item) {
			if (filtrosSeleccionados[key] || key == "id") {
				listaMapeada[key] = item[key];
			}
		}
		return listaMapeada;
	});
	renderizarTable(createTable(listaMap), document.getElementById("divTabla"));
}

function handlerClick(e) {
	if (e.target.matches("td")) {
		//console.log(e.target.parentNode.dataset.id); // el id lo recupero asi porque lo meti en data-id,
		let id = e.target.parentNode.dataset.id;
		const anuncio = anuncios.filter((p) => p.id === parseInt(id))[0]; //filter devuelve un array de las coincidencias, entonces le paso la pos 0
		cargarFormulario(
			frm,
			id,
			anuncio.titulo,
			anuncio.transaccion,
			anuncio.descripcion,
			anuncio.precio,
			anuncio.puertas,
			anuncio.kms,
			anuncio.potencia
		); //cargo el formulario con los datos de la tabla
		modificarFuncionBoton(e.target);
	} else if (!e.target.matches("input")) {
		modificarFuncionBoton(e.target);
		limpiaFormulario(frm);
	}
}

function handlerCancelar(e) {
	modificarFuncionBoton(e.target);
	limpiaFormulario(frm);
	modificarFuncionBoton(e.target);
}

function modificarFuncionBoton(target) {
	if (target.matches("td")) {
		btnGuardar.removeAttribute("class");
		btnGuardar.setAttribute("class", "btn btn-success oculto");
		btnModificar.removeAttribute("class");
		btnModificar.setAttribute("class", "btn btn-success");
		btnEliminar.removeAttribute("class");
		btnEliminar.setAttribute("class", "btn btn-danger");
		btnCancelar.removeAttribute("class");
		btnCancelar.setAttribute("class", "btn btn-warning");
	} else {
		btnGuardar.removeAttribute("class");
		btnGuardar.setAttribute("class", "btn btn-success");
		btnEliminar.removeAttribute("class");
		btnEliminar.setAttribute("class", "btn btn-danger oculto");
		btnCancelar.removeAttribute("class");
		btnCancelar.setAttribute("class", "btn btn-warning oculto");
		btnModificar.removeAttribute("class");
		btnModificar.setAttribute("class", "btn btn-success oculto");
	}
}

function cargarFormulario(formulario, ...datos) {
	formulario.id.value = datos[0];
	formulario.titulo.value = datos[1];
	formulario.transaccion.value = datos[2];
	formulario.descripcion.value = datos[3];
	formulario.precio.value = datos[4];
	formulario.puertas.value = datos[5];
	formulario.kms.value = datos[6];
	formulario.potencia.value = datos[7];
}

function handlersubmit(e) {
	e.preventDefault();
	const frm = e.target;
	console.log(e.target);
	const nuevoAnuncio = new Anuncio_Auto(
		Date.now(),
		frm.titulo.value,
		frm.transaccion.value,
		frm.descripcion.value,
		frm.precio.value,
		frm.puertas.value,
		frm.kms.value,
		frm.potencia.value
	);
	altaAnuncio(nuevoAnuncio);
}

function limpiaFormulario(formulario) {
	const frmArray = [...formulario];
	frmArray.forEach((element) => {
		let tipo = element.type;
		if (tipo == "text") {
			element.value = "";
		}
	});
}

//#endregion Formulario y sus funciones

//#region Table

function handlerLoadTable(e) {
	renderizarTable(createTable(anuncios), document.getElementById("divTabla"));
}

function renderizarTable(tabla, contenedor) {
	while (contenedor.hasChildNodes()) {
		contenedor.removeChild(contenedor.firstChild);
	}
	if (tabla) {
		contenedor.appendChild(tabla);
	}
}

/**
 * Crea la tabla
 */
function createTable(items) {

	const tabla = document.createElement("table");
	tabla.setAttribute(
		"class",
		"table table-hover table-dark"
	);
	tabla.appendChild(createThead(items[0]));
	tabla.appendChild(createTbody(items));
	return tabla;
}

function createThead(items) {
	const thead = document.createElement("thead");
	thead.setAttribute("class", "table table-dark");
	const tr = document.createElement("tr");
	for (const key in items) {
		if (key != "id") {
			const th = document.createElement("th");
			th.textContent = key;
			tr.appendChild(th);
		}
	}
	thead.appendChild(tr);
	return thead;
}

function createTbody(items) {
	const tbody = document.createElement("tbody");
	items.forEach((element) => {
		const tr = document.createElement("tr");
		for (const key in element) {
			if (key === "id") {
				tr.setAttribute("data-id", element[key]);
			} else {
				const td = document.createElement("td");
				td.textContent = element[key];
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	});
	return tbody;
}
//#endregion

//#region get
window.addEventListener("DOMContentLoaded", () => {

	getDatosAjax(() => {
		crearArticulo(anuncios);
		handlerLoadTable();
	});
	frm.addEventListener("submit", handlersubmit);
	btnModificar.addEventListener("click", handlreModificarAnuncio);
	btnEliminar.addEventListener("click", handlreEliminarAnuncio);
	btnCancelar.addEventListener("click", handlerCancelar);
	document.addEventListener("click", handlerClick); // le agreggo el evento click al documento
	cmbTrsns.addEventListener("change", handlerFiltro);
	checkBox.forEach((element) => element.addEventListener("click", handleCheck));
});

/**
 * Obtener info con ajax
 */
const getDatosAjax = () => {

	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				const datos = JSON.parse(xhr.responseText);
				anuncios = datos;
				listaTemporal = datos;
				handlerLoadTable();
			} else {
				const statusText = xhr.statusText || "Ocurrio un error";
				console.error(`Error: ${xhr.status} : ${statusText}`);
			}
				clearDivSpinner();
		} else {	
			divSpinner.appendChild(getSpinner());	
		}
	};
	xhr.open("GET", URL);
	xhr.send();
};
//#endregion get

//#region post

function altaAnuncio(anuncio) {
	anuncios.push(anuncio);

	//Fetch
	postDatosFetch(anuncio);
	limpiaFormulario(frm);
}

/** POST FETCH
 * 
 * @param {*} objeto 
 */
const postDatosFetch = (objeto) => {

	divSpinner.appendChild(getSpinner());	
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
		body: JSON.stringify(objeto)
	};

	fetch(URL, options)
		.then((res) => {
			return res.ok ? res.json() : Promise.reject(res);
		})
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error(`Error: ${error.status} : ${error.status}`);
		})
		.finally(() => {
			clearDivSpinner();
		});
};
//#endregion post

//#region delete
function handlreEliminarAnuncio(e) {
	if (confirm("Confirma la Eliminacion")) {
		let id = parseInt(frm.id.value);
		console.log(id);

		//DELETE FETCH
		deleteDatosFetch(id);
		limpiaFormulario(frm);
		modificarFuncionBoton(e.target);
	}
}

/** DELETE FETCH
 * 
 * @param {*} id 
 */
const deleteDatosFetch = (id) => {

	const options = {
		method: "DELETE"
	};
	fetch(URL + `/${id}`, options)
		.then((res) => {
			return res.ok ? res.json() : Promise.reject(res);
		})
		.then((data) => {
			anuncios = data.data; 
		})
		.catch((error) => {
			console.error(`Error: ${error.status} : ${error.status}`);
		})
		.finally(() => {
			clearDivSpinner();
		});
};


//#endregion

//#region put

function handlreModificarAnuncio(e) {
	if (confirm("Confirma la Modificacion")) {

		let id = parseInt(frm.id.value);
		const anuncioModificado = new Anuncio_Auto(
			id,
			frm.titulo.value,
			frm.transaccion.value,
			frm.descripcion.value,
			frm.precio.value,
			frm.puertas.value,
			frm.kms.value,
			frm.potencia.value
		);
		//PUT FETCH
		putDatosFetch(id,anuncioModificado);
		limpiaFormulario(frm);
		modificarFuncionBoton(e.target);
	}
}

/** PUT FETCH
 * 
 * @param {*} id 
 * @param {*} objeto 
 */
const putDatosFetch = (id, objeto) => {

	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
		body: JSON.stringify(objeto)
	};
	fetch(URL + `/${id}`, options)
		.then((res) => {
			return res.ok ? res.json() : Promise.reject(res);
		})
		.then((data) => {
			anuncios = data.data;
		})
		.catch((error) => {
			console.error(`Error: ${error.status} : ${error.status}`);
		})
		.finally(() => {
			clearDivSpinner();
		});
};


//#endregion
