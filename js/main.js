// Declaración de variables
let descripcionEntregable = 0; // Definición del documento, plano o actividad a cuantificar
let cantidadHP = 0; //Definición de Horas Persona (HP)
let entregableHP = 0; //Definición de la descripción entregable con su respectivo esfuerzo en HP
let sumaHP = 0; //Inicialización de suma de HP
let listaEntregables = "______________________"; //Inicialización de suma de HP

// Función para generar el entregable y las horas
function entrgablesHP(p1,p2) {
    return p1 + " : " + p2;
}

// Función para sumar las HP
function hpTotales(p1,p2) {
    return Number(p1) + Number(p2);
}

// Función para sumar las HP
function alertaEntregables(p1,p2) {
    return p1 + "\n" + p2 + "\n";
}

//Ejecuta el código mientras no se solicite salir
while (descripcionEntregable != "ESC") {
    // Revisa si se ingresa correctamente el tipo de entregable
    do {
        // Se solicita el tipo de entregable
        descripcionEntregable = prompt("Ingrese las tres letras que identifican el tipo de entregable: documento (doc), plano (pln) o actividad (act) - Si quiere terminar, escriba ESC.");
        //Revisa el tipo de entregable ingresado
        switch (descripcionEntregable) {
            case "doc":
                descripcionEntregable = "Documento";
                break;
            case "pln":
                descripcionEntregable = "Plano";
                break;
            case "act":
                descripcionEntregable = "Actividad";
                break;
            case "DOC":
                descripcionEntregable = "Documento";
                break;
            case "PLN":
                descripcionEntregable = "Plano";
                break;
            case "ACT":
                descripcionEntregable = "Actividad";
                break;
            case "ESC":
                cantidadHP = "ESC";
                break;
            case "esc":
                cantidadHP = "ESC";
                break;
            default:
                descripcionEntregable = 0;
                break;
        }
    } while (descripcionEntregable == 0);
    // Revisar si se ingresa correctamente la cantidad de horas personas
    do {
        //Revisa si se desea salir
        switch (cantidadHP) {
            case "ESC":
                descripcionEntregable = "ESC";
                cantidadHP = 876000;
                break;
            case "esc":
                descripcionEntregable = "ESC";
                cantidadHP = 876000;
                break;
            //Genera una salida al do while
            case 876000:
                break;
            default:
                cantidadHP = prompt("Ingrese la estimación de esfuerzo (en HP) para generar el entregable");
                break;
        }    
    } while(!parseInt(cantidadHP) || cantidadHP < 0);

    if (descripcionEntregable != "ESC") {
        console.log(entrgablesHP(descripcionEntregable,cantidadHP));
        sumaHP = hpTotales(sumaHP,cantidadHP);
        listaEntregables = alertaEntregables(listaEntregables,entrgablesHP(descripcionEntregable,cantidadHP));
    }
}

console.log("La cantidad total de HP es: " + sumaHP);
alert(listaEntregables + "\n" + "La cantidad total de HP es: " + sumaHP + "\n" + "\n" + "Se terminó la ejecución, revise la consola.");
