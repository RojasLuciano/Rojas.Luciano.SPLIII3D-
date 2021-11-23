import { crearArticulo } from "./script.js";

//busco el local storage
const autos = JSON.parse(localStorage.getItem("anuncios")) || [];

if(autos.length != 0){
    crearArticulo(autos);
}