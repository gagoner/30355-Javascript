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

// Recuperación de Bases de Datos de Entregable almacenados
BD = JSON.parse(localStorage.getItem("bdEntregables"));
idBD = JSON.parse(localStorage.getItem("idEntregables"));
UF = JSON.parse(localStorage.getItem("valorUF"));
UF = Number(UF);

document.getElementById("UF").innerHTML = "$ " + UF + " CLP";

// Función guardar la base de datos de forma local
guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor)};

// Operador Ternario
let verificacion = BD !== null ? BD.forEach(desestructurarBD) : bandera = 0;

// Desestructuración de Base de Datos y Objetos para rearmar el listado de entregables en el UI
function desestructurarBD(value, index, array) {
    const listaEntregables = document.getElementById("valorizacionEntregables");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `
    <td>${value.tipo}</td>
    <td>${value.descripcion}</td>
    <td class="text-center" id="HP${value.indice}">${value.hp}</td>
    <td class="text-center"><input class="claseUFHP" type="number" min="0" max="999" step="0.01" id="UFHP${value.indice}" placeholder="0" name="tarifa" value=${value.tarifa}></td>
    <td class="text-center" id="CLP${value.indice}" >${resultado = value.tarifa == 0 ? "-" : new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 10 }).format(value.total)}</td>
    `;
    listaEntregables.appendChild(elemento);

    // Agrega suma de CLP
    if (index == array.length - 1) {
        const listaEntregables = document.getElementById("valorizacionEntregables");
        const elemento2 = document.createElement("tr");
        elemento2.innerHTML = "<td></td><td></td><td></td><td class=\"text-end\"><strong>TOTAL CLP:</strong></td><td class=\"text-center\"><strong id=\"suma\">" + sumaCLP(BD) + "</strong></td>";
        listaEntregables.appendChild(elemento2);
        bandera = 1;
    }
}

// Suma de valor de Entregables
function sumaCLP(array) {
    let sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += Number(array[index].total);
        console.log(array[index].total);
    }
    return new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 10 }).format(sum);
}

// Interacción con el usuario
class UI {

    // Multiplicar entregable de forma individual
    multiplicarEntregable(elemento) {
        if (elemento.name === "tarifa") {
            let tarifaUFHP = document.getElementById(elemento.id).value;
            let idTemp = elemento.id;
            let idHP = idTemp.replace("UFHP", "HP");
            let totalHP = document.getElementById(idHP).innerText;
            let idCLP = idTemp.replace("UFHP", "CLP");
            let resultadoCLP = totalHP * tarifaUFHP * UF;
            resultadoCLP = new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 10 }).format(resultadoCLP);
            document.getElementById(idCLP).innerText = resultadoCLP;
            let idIndice = idTemp.replace("UFHP", "");
            idIndice = Number(idIndice);
            for (const obj of BD) {
                if (obj.indice=== idIndice) {
                    obj.tarifa = Number(tarifaUFHP);
                    obj.total = Number(totalHP * tarifaUFHP * UF);
                    break;
                }
            }
            document.getElementById("suma").innerText = sumaCLP(BD);
            guardarLocal("bdEntregables", JSON.stringify(BD));
        }
    }
}



// Eventos en el DOM
document.getElementById("formulario").addEventListener("change", (e) => {
    const ui = new UI();
    ui.multiplicarEntregable(e.target);
});