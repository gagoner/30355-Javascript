// Array de saludo
const saludos = ["Hola", "Bienvenido", "Buen día", "Saludos", "Que gusto verle", "Encantado de conocerle"];

// Selección del saludo

let saludo = "¡" + saludos[Math.floor(Math.random()*saludos.length)] + "!";

// Salida del por html
document.getElementById("saludo").innerHTML = saludo + "Esta es mi Entrega Final.";

// Inicialización de variables
const baseDatos = [];
const temp = [];
const temp2 = [];
let suma = 0;
let bandera = 1;
let bandera2 = 0;
let idBD = 0;
let UF = 0;

// Creación de constructor de Entregables
class Entregable {
    constructor(tipo, descripcion, hp, indice) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.hp = hp;
        this.indice = indice;
    }
}


// Recuperación de Bases de Datos de Entregable almacenados
BD = JSON.parse(localStorage.getItem("bdEntregables"));
idBD = JSON.parse(localStorage.getItem("idEntregables"));
UF = JSON.parse(localStorage.getItem("valorUF"));
idBD = Number(UF);

// Operador Ternario
let verificacion = BD !== null ? BD.forEach(desestructurarBD) : bandera = 0;

// Desestructuración de Base de Datos y Objetos para rearmar el listado de entregables en el UI
function desestructurarBD(value, index, array) {
    const listaEntregables = document.getElementById("valorizacionEntregables");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `
    <td>${value.tipo}</td>
    <td>${value.descripcion}</td>
    <td class="text-center">${value.hp}</td>
    <td class="text-center"><input class="claseUFHP" type="number" min="0" max="999" step="0.01" id="UFHP${value.indice}" placeholder="0">${value.indice}</td>
    <td class="text-center" id="stCLP${value.indice}" >${UF * Number(value.indice)}</td>
    `;
    listaEntregables.appendChild(elemento);

    // Agrega suma de HP
    if (index == array.length - 1) {
        const listaEntregables = document.getElementById("valorizacionEntregables");
        const elemento2 = document.createElement("tr");
        elemento2.innerHTML = "<td></td><td></td><td></td><td class=\"text-end\"><strong>TOTAL CLP:</strong></td><td class=\"text-center\"><strong id=\"suma\">" + sumaHP(BD) + "</strong></td>";
        listaEntregables.appendChild(elemento2);
        bandera = 1;
    }
}

// Suma de HP
function sumaHP(array) {
    let sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += Number(array[index].hp);
    }
    return sum;
}

// Interacción con el usuario

class UI {
    agregarEntregable(entregables, bandera) {
        const listaEntregables = document.getElementById("valorizacionEntregables");
        if (bandera == 1) {
                listaEntregables.removeChild(listaEntregables.lastChild);
        }
        entregables.forEach(desestructurarBD);
        temp.splice(0,1);
    }

    // Llama a una librería para mostrar mensajes superpuestos
    mostrarMensaje(mensaje) {
        Toastify({
            text: mensaje,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#8285CF",
                background: "linear-gradient(to right, #0cbaba, #380036)"
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }
}