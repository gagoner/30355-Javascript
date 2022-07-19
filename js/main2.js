// Array de saludo
const saludos = ["Hola", "Bienvenido", "Buen día", "Saludos", "Que gusto verle", "Encantado de conocerle"];

// Selección del saludo

let saludo = "¡" + saludos[Math.floor(Math.random()*saludos.length)] + "!";

// Salida del por html
document.getElementById("saludo").innerHTML = saludo + " Esta es mi Entrega Final.";

// Inicialización de variables
const baseDatos = [];
const temp = [];
const temp2 = [];
let suma = 0;
let bandera = 1;
let bandera2 = 0;
let idBD = 0;
let UF = 0;
let iva = 0.19; // Impuesto de valor agregado

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
    <td class="text-center" id="CLP${value.indice}" >${resultado = value.tarifa == 0 ? "-" :  "$ " + new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 10 }).format(value.total)}</td>
    `;
    listaEntregables.appendChild(elemento);

    // Agrega suma de CLP
    if (index == array.length - 1) {
        const listaEntregables = document.getElementById("valorizacionEntregables");
        const elemento2 = document.createElement("tr");
        let totalCLP = new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 10 }).format(sumaCLP(BD));
        elemento2.innerHTML = "<td></td><td></td><td></td><td class=\"text-end\"><strong>Total Neto CLP:</strong></td><td class=\"text-center\"><strong id=\"suma\">" + "$ " + totalCLP + "</strong></td>";
        listaEntregables.appendChild(elemento2);
        const elemento3 = document.createElement("tr");
        let varIVA = new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 8 }).format(iva * sumaCLP(BD));
        elemento3.innerHTML = "<td></td><td></td><td></td><td class=\"text-end\"><strong>I.V.A.:</strong></td><td class=\"text-center\"><strong id=\"iva\">" + "$ " + varIVA + "</strong></td>";
        listaEntregables.appendChild(elemento3);
        const elemento4 = document.createElement("tr");
        let varTotal = new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 8 }).format((1+iva) * sumaCLP(BD));
        elemento4.innerHTML = "<td></td><td></td><td></td><td class=\"text-end\"><strong>GRAND TOTAL:</strong></td><td class=\"text-center\"><strong id=\"grandTotal\">" + "$ " + varTotal + "</strong></td>";
        listaEntregables.appendChild(elemento4);
        bandera = 1;
    }
}

// Suma de valor de Entregables
function sumaCLP(array) {
    let sum = 0;
    for (let index = 0; index < array.length; index++) {
        sum += Number(array[index].total);
    }
    return sum;
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
            document.getElementById("suma").innerText = "$ " +new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 10 }).format(sumaCLP(BD));
            document.getElementById("iva").innerText = "$ " + new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 8 }).format(iva * sumaCLP(BD));            
            document.getElementById("grandTotal").innerText = "$ " + new Intl.NumberFormat('es-CL', { maximumSignificantDigits: 8 }).format((1 + iva) * sumaCLP(BD));
            guardarLocal("bdEntregables", JSON.stringify(BD));
        }
    }
}



// Eventos en el DOM
document.getElementById("formulario").addEventListener("change", (e) => {
    const ui = new UI();
    ui.multiplicarEntregable(e.target);
});

document.getElementById("imprimir").addEventListener("click", (e) => {
    const ui = new UI();
    window.print();
});