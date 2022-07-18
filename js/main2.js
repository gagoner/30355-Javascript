// Array de saludo
const saludos = ["Hola", "Bienvenido", "Buen día", "Saludos", "Que gusto verle", "Encantado de conocerle"];

// Selección del saludo

let saludo = "¡" + saludos[Math.floor(Math.random()*saludos.length)] + "!";

// Salida del por html
document.getElementById("saludo").innerHTML = saludo + "Esta es mi Entrega Final.";

// Recuperación de Bases de Datos de Entregable almacenados
BD = JSON.parse(localStorage.getItem("bdEntregables"));
idBD = JSON.parse(localStorage.getItem("idEntregables"));
idBD = Number(idBD);

console.log(BD);
console.log(idBD);