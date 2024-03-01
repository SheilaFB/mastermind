//NECESITO CREAR UN CONTADOR DE INTENTOS. CON ESTE CONTADOR ACCEDO A FILA NO MÉTODO COMPROBAR

var recibirParametros = new URLSearchParams(window.location.search);
var nivel = recibirParametros.get('niv');
var colores = recibirParametros.get('col');
console.log('NIVEL: ' + nivel);
console.log('COLORES: ' + colores);



//Número del intento
var numIntentoParaArray = 0;

//mapa con los colores
let mapColores = new Map();

//Mapa que guarda como clave el numIntento y como valor el array de la tirada
let intentos = new Map();

//Combinación creada por la máquina para adivinar
let combinacion = crearCombinacion();

//Al comprobar la tirada, habrá aciertos y fallos. Se guardarán en este array
var tiradaAciertos = [];

//variable para recoger el valor de un botón (se corresponde con las claves de mapColores)
var colorPintar=0;

//contadorIntento
var contadorIntento = 0;

mapColores.set(1,'#ff6961');
mapColores.set(2,'#08cad1');
mapColores.set(3,'#f8f38d');
mapColores.set(4,'#42d6a4');
mapColores.set(5,'#9d94ff');
mapColores.set(6,'#ffb480');
mapColores.set(7,'#c780e8');
mapColores.set(8,'#59adf6');

crearOpciones();
crearPartida();


//Método para crear los botones para escoger los colores de la tirada
function crearOpciones(){
    let contenedorOpciones = document.getElementById("botonesOpciones");

    for(let i = 1; i <= colores; i++){
        let botonOpcion = document.createElement("button");
        botonOpcion.style.backgroundColor = mapColores.get(i);
        botonOpcion.value=i;
        botonOpcion.style.width='40px';
        botonOpcion.style.height='40px';
        botonOpcion.style.borderRadius="20px";
        
        botonOpcion.addEventListener('click',function(){
            //Quitar activo
            var botonesIterar = document.getElementById('botonesOpciones').getElementsByTagName('button');
            for (var i = 0; i < botonesIterar.length; i++) {
            botonesIterar[i].classList.remove('activo');
            }
            botonOpcion.classList.add("activo");
            colorPintar=parseInt(botonOpcion.value);
        });   
        contenedorOpciones.appendChild(botonOpcion);
    }
}

//Crear combinación correcta para adivinar
function crearCombinacion(){
    console.log('*****Combinación correcta******')
    let comb = [];
    for (let i = 0; i < nivel; i++) {
        colorAleatorio = Math.floor(Math.random()*colores)+1;
        comb.push(colorAleatorio); 
        console.log(colorAleatorio)
    }
    console.log('*************************')
    return comb;
}

//Método para crear la partida

function crearPartida(){
    for(let i = 0; i<7; i++){
        crearFilaPartida(i);
    }
}

//Método para crear la fila de botones
function crearFilaPartida(numFila){
    let contenedor = document.getElementById("contenedor");
    //Contenedor de los botones
    let contenedorBotones = document.createElement("div");
    let fila = document.createElement("div");
    fila.classList.add("fila");
    fila.style.display="flex";
    contenedorBotones.id="contenedorBotones"+numFila;
    contenedorComprobarYaciertos = document.createElement("div");
    contenedorComprobarYaciertos.id = "contenedorComprobarYaciertos"+numFila;
    //botones del contenedor, dependenderá del nivel
    for(let i = 0; i < nivel; i++){
        let boton=document.createElement("button");
        boton.style.backgroundColor = "white";
        boton.style.width='40px';
        boton.style.height='40px';
        boton.style.borderRadius="20px";
        boton.addEventListener('click',function(){
            if(colorPintar != 0){
                boton.style.backgroundColor = mapColores.get(colorPintar);
                boton.value=colorPintar;
                colorPintar=0;
                //Quitar activo
                var botonesIterar = document.getElementById('botonesOpciones').getElementsByTagName('button');
                for (var i = 0; i < botonesIterar.length; i++) {
                botonesIterar[i].classList.remove('activo');
                }
            }
        });    
        contenedorBotones.appendChild(boton);
    }
    let botonComprobar = document.createElement("button");
    botonComprobar.innerHTML="Comprobar"

    var tiradaActual= []

    //FUNCION DEL BOTÓN COMPROBAR

    botonComprobar.addEventListener('click',function(){

    var botonesValores = document.getElementById('contenedorBotones'+contadorIntento).childNodes;
    for (var i = 0; i < botonesValores.length; i++) {
        tiradaActual.push(parseInt(botonesValores[i].value));
    }
    //console.log('TiradaActual: ' + tiradaActual);
    let aciertos = comprobarIntento(tiradaActual);
    mostrarAciertos("contenedorComprobarYaciertos"+contadorIntento, aciertos);
    contadorIntento++;
    
    });

    contenedor.appendChild(fila);
    fila.appendChild(contenedorBotones);
    fila.appendChild(contenedorComprobarYaciertos).appendChild(botonComprobar);
}


function mostrarAciertos(contenedorMostrarAciertos, aciertosMostrar){


    var contenedorActual = document.getElementById(contenedorMostrarAciertos);
    contenedorActual.innerHTML="";
    contenedorActual.classList.add('grid'+nivel,'aciertos');
    
    
    var caja = document.createElement('div');

    for(let i = 0; i<nivel; i++){
        var caja = document.createElement('div');
        switch(aciertosMostrar[i]){
            case 3: 
                caja.style.backgroundColor='red';
            break;
            case 1: 
                caja.style.backgroundColor='green';
            break;
            case 2:
                caja.style.backgroundColor='yellow';
            break;
            default:
                caja.style.backgroundColor='white';
            break;
        }
        caja.style.width='10px';
        caja.style.height='10px';
        caja.style.borderRadius='5px';
        contenedorActual.appendChild(caja);
    }

}


//recibe un array con la combinación de colores seleccionada. Crea un nuevo array para guardar si está en la combinación correcta o no.
function comprobarIntento(arrayTirada){
    //console.log('Array que recibo de tirada actual ' + arrayTirada)
    //console.log('Combinación a adivinar ' + combinacion)
    tiradaAciertos=[];
    numIntentoParaArray++;
    intentos.set(numIntentoParaArray,arrayTirada);
    //console.log('Numero intento ' + intentos.size);

    for (let i = 0; i < nivel; i++) {
        console.log('..............POSICION' + i +'..............');
        //console.log('Combinación: ' + combinacion[i])
        //console.log('ArrayTirada: ' + arrayTirada[i])
        numero=arrayTirada[i];
        //console.log(combinacion);
    
        if(combinacion.includes(numero)){ 
            console.log('Está en la combiacion')

            if(combinacion[i] === arrayTirada[i]){
                console.log('Y además has acertado')
                //1 -> Está en la combinación y está colocado bien
                tiradaAciertos.push(1);
            }else {
                //2-> Está en la combinación pero no está bien colocado
                tiradaAciertos.push(2);
            }
        }else {
            console.log('No está en la combinación')
            //No está en la combinación
            tiradaAciertos.push(3);
        } 
        console.log('....................................');
    }

    /*
    console.log('----------RESULTADO DE LA TIRADA----------');
    for (let i = 0; i < tiradaAciertos.length; i++) {
        console.log('color'+i+ ": " + tiradaAciertos[i]);
    }
    console.log('-------------------------');
    */

    return tiradaAciertos;

}