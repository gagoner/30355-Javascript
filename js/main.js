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
let UF = 33504.30; //Se identifica caída del servidor proveedor del dato (28/07/22). Se coloca un valor referencial mientras se resuelve la situación
guardarLocal("valorUF", UF);


// Creación de constructor de Entregables
class Entregable {
    constructor(tipo, descripcion, hp, indice, tarifa, total) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.hp = hp;
        this.indice = indice;
        this.tarifa = tarifa;
        this.total = total;
    }
}

// Fetch de valor UF
fetch('https://mindicador.cl/api').then(function(response) {
    return response.json();
}).then(function(dailyIndicators) {
    document.getElementById("UF").innerHTML = "$ " + dailyIndicators.uf.valor + " CLP";
    UF = Number(dailyIndicators.uf.valor);
    guardarLocal("valorUF", UF);
}).catch(function(error) {
    console.log('Requestfailed', error);
});

// Función guardar la base de datos de forma local
guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor)};

// Recuperación de Bases de Datos de Entregable almacenados
BD = JSON.parse(localStorage.getItem("bdEntregables"));
idBD = JSON.parse(localStorage.getItem("idEntregables"));
idBD = Number(idBD);

// Operador Ternario
let verificacion = BD !== null ? BD.forEach(desestructurarBD) : bandera = 0;

// Desestructuración de Base de Datos y Objetos para rearmar el listado de entregables en el UI
function desestructurarBD(value, index, array) {
    const listaEntregables = document.getElementById("listadoEntregables");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `
    <td>${value.tipo}</td>
    <td>${value.descripcion}</td>
    <td class="text-center">${value.hp}</td>
    <td><a href="#" id="${value.indice}" class="btn btn-danger btn-sm" name="borrar">X</a></td>
    `;
    listaEntregables.appendChild(elemento);
    baseDatos.push(value);
    idBD++;
    
    // Guarda datos a nivel local
    guardarLocal("bdEntregables", JSON.stringify(baseDatos));
    guardarLocal("idEntregables", JSON.stringify(idBD));

    // Agrega suma de HP
    if (index == array.length - 1) {
        const listaEntregables = document.getElementById("listadoEntregables");
        const elemento2 = document.createElement("tr");
        elemento2.innerHTML = "<td></td><td class=\"text-end\"><strong>TOTAL:</strong></td><td class=\"text-center\"><strong id=\"suma\">" + sumaHP(baseDatos) + "</strong></td><td></td>";
        listaEntregables.appendChild(elemento2);
        bandera = 1;
    }
}

// Crear listado de filtrado de Base de Datos
function filtrarBD(value, index, array) {
    const listaEntregables = document.getElementById("filtradoEntregables");
    const elemento = document.createElement("tr");
    elemento.innerHTML = `
    <td>${value.tipo}</td>
    <td>${value.descripcion}</td>
    <td class="text-center">${value.hp}</td>
    `;
    listaEntregables.appendChild(elemento);
    temp2.push(value);
    
    // Agrega suma de HP
    if (index == array.length - 1) {
        const listaEntregables = document.getElementById("filtradoEntregables");
        const elemento2 = document.createElement("tr");
        elemento2.innerHTML = "<td></td><td class=\"text-end\"><strong>TOTAL:</strong></td><td class=\"text-center\"><strong id=\"suma2\">" + sumaHP(temp2) + "</strong></td>";
        listaEntregables.appendChild(elemento2);
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
        const listaEntregables = document.getElementById("listadoEntregables");
        if (bandera == 1) {
                listaEntregables.removeChild(listaEntregables.lastChild);
        }
        entregables.forEach(desestructurarBD);
        temp.splice(0,1);
    }

    // Inicializar el formulario al ingresar datos
    borrarFormulario() {
        document.getElementById("formularioEntregables").reset();
    }
    
    // Borra entregable de forma individual
    borrarEntregable(elemento) {
        if (elemento.name === "borrar") {
            elemento.parentElement.parentElement.remove();
            const buscar = obj => obj.indice == elemento.id;
            let elementoBorrado = baseDatos.findIndex(buscar);
            baseDatos.splice(elementoBorrado, 1);
            guardarLocal("bdEntregables", JSON.stringify(baseDatos));
            document.getElementById("suma").innerHTML = sumaHP(baseDatos);
            // Elimina la suma e inicializa las variables si manualmente se borra todo
            if (baseDatos.length == 0) {
                const elemento3 = document.getElementById("listadoEntregables");
                while (elemento3.firstChild) {
                    elemento3.removeChild(elemento3.lastChild);
                }
                baseDatos.length = 0;
                bandera = 0;
                idBD = 0;
                localStorage.removeItem("bdEntregables");
                localStorage.removeItem("idEntregables");
            }
            this.mostrarMensaje("Entregable borrado adecuadamente.");
        }
    }

    // Filtra entregables según la selección en el área de filtrado
    filtrarEntregables(seleccion){
        const filtrado = baseDatos.filter(selector => selector.tipo == seleccion);
        filtrado.forEach(filtrarBD);
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

// Eventos en el DOM
document.getElementById("formularioEntregables").addEventListener("submit", function (e) {
    // Suprimir el comportamiento por defecto del botón Submit
    e.preventDefault();
    
    // Obtener los valores del formulario
    const tipo = document.getElementById("tipoEntregable").value,
    entregable = document.getElementById("entregable").value,
    hp = document.getElementById("HP").value, indice2 = idBD;
    
    // Crea una nueva instancia de UI
    const ui = new UI();
    
    // Validación del ingreso    
    if (tipo === "" || entregable === "" || hp === "") {
        ui.mostrarMensaje("Por favor ingresa datos en todos los campos");
        return;
    }
    
    // Crear un nuevo objeto
    const objetoEntregables = new Entregable(tipo, entregable, hp, indice2, 0, 0);
    temp.push(objetoEntregables);
    
    // Agrega el entregable e incializa el formulario
    ui.agregarEntregable(temp, bandera);
    ui.mostrarMensaje("Entregable añadido correctamente.");
    ui.borrarFormulario();
});

// Llama a la función borrar entegable de forma individual
document.getElementById("listadoEntregables").addEventListener("click", (e) => {
    const ui = new UI();
    ui.borrarEntregable(e.target);
    e.preventDefault();
});

// Borra todo lo que se haya ingresado como entregable
document.getElementById("botonTodo").addEventListener("click", function (e) {
    const ui = new UI();
    const elemento2 = document.getElementById("listadoEntregables");
    while (elemento2.firstChild) {
        elemento2.removeChild(elemento2.lastChild);
    }
    const elemento5 = document.getElementById("filtradoEntregables");
    while (elemento5.firstChild) {
        elemento5.removeChild(elemento5.lastChild);
    }
    baseDatos.length = 0;
    bandera = 0;
    idBD = 0;
    localStorage.removeItem("bdEntregables");
    localStorage.removeItem("idEntregables");
    ui.mostrarMensaje("Borrado completo.");
});

// Limpia formulario
document.getElementById("botonLimpiar").addEventListener("click", function (e) {
    const ui = new UI();
    ui.borrarFormulario();
});

// Limpia el filtro
document.getElementById("tipoFiltro").addEventListener("change", function (e) {
    const ui = new UI();
    // Borra lo que haya antes
    const elemento4 = document.getElementById("filtradoEntregables");
    while (elemento4.firstChild) {
        elemento4.removeChild(elemento4.lastChild);
    }

    // Obtener los valores del formulario
    const seleccion = document.getElementById("tipoFiltro").value;    
    ui.filtrarEntregables(seleccion);
    temp2.length = 0;
    cons>ole.log(seleccion);
    ui.borrarFormulario();
});
