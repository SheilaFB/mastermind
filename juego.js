//NECESITO CREAR UN CONTADOR DE INTENTOS. CON ESTE CONTADOR ACCEDO A FILA NO MÉTODO COMPROBAR

var recibirParametros = new URLSearchParams(window.location.search);
if(recibirParametros.get('niv')==null) {
   var nivel = 4;
} else {
    var nivel = recibirParametros.get('niv');
}

var colores = recibirParametros.get('col');
var permitirDuplicados = parseInt(recibirParametros.get('per'));
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

//boleano para partida ganada;
var partidaGanada = false;

mapColores.set(1,'#FF0000');
mapColores.set(2,'#FFA500');
mapColores.set(3,'#FFFF00');
mapColores.set(4,'#00FF00');
mapColores.set(5,'#0000FF');
mapColores.set(6,'#4B0082');
mapColores.set(7,'#EE82EE');
mapColores.set(8,'#FF007F');

//Comprueba que los parámetros sean correctos
if((nivel==4||nivel==6) && (colores==6 || colores==8) && (permitirDuplicados==0 || permitirDuplicados==1)){
crearOpciones();
crearPartida();
} else {
    let contenedorError = document.getElementById('contenedor');
    let error = document.createElement('h1');
    error.innerHTML='404. NOT FOUND';
    contenedorError.appendChild(error);
}

function componenteBoton(colorBoton){
    let boton = document.createElement("button");
    boton.style.backgroundColor = colorBoton;
    boton.style.width='40px';
    boton.style.height='40px';
    boton.style.borderRadius="20px";
    return boton;
}

//Método para crear los botones para escoger los colores de la tirada
function crearOpciones(){
    let contenedorOpciones = document.getElementById("botonesOpciones");

    //Recoore la lista de colores. Crea un botón de cada color
    for(let i = 1; i <= colores; i++){
        let botonOpcion = componenteBoton(mapColores.get(i));
        botonOpcion.value=i;
        
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
    while (comb.length!=nivel) {
        colorAleatorio = Math.floor(Math.random()*colores)+1;
        if (permitirDuplicados == 1){
            console.log('Entra igualmente')
            comb.push(colorAleatorio); 
        } else {
            if (!comb.includes(colorAleatorio)){
                console.log('No estoy repe')
                comb.push(colorAleatorio); 
            }else {
                console.log('Estoy repe')
            }
        }
        console.log(colorAleatorio)
    }
    console.log(comb);
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
    let contenedorComprobarYaciertos = document.createElement("div");
    contenedorComprobarYaciertos.classList.add('intento');
    contenedorComprobarYaciertos.id = "contenedorComprobarYaciertos"+numFila;
    let informacionPartida = document.createElement('div');
    informacionPartida.id='info';
    //botones del contenedor, dependenderá del nivel
    for(let i = 0; i < nivel; i++){
        let boton=componenteBoton('#FFFFF');
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

    //Creamos un div para meter dentro de contenedorComprobarYaciertos. Aquí será donde pondremos el botón de comprobar y los resultados

    let inicial = document.createElement('div');
    
    inicial.style.backgroundColor='#CFCFCF';
    inicial.style.width='80px';
    inicial.style.height='100%';
    inicial.style.borderRadius='10px';
    

    contenedor.appendChild(informacionPartida);
    contenedor.appendChild(fila);
    fila.appendChild(contenedorBotones);
    fila.appendChild(contenedorComprobarYaciertos).appendChild(inicial);
    

    if (numFila==0){
        mostrarBotonComprobar('contenedorComprobarYaciertos'+contadorIntento);
    }
}

function mostrarBotonComprobar(contenedorMostrarBoton){
    console.log(contenedorMostrarBoton);
    var contenedorActual = document.getElementById(contenedorMostrarBoton);
    contenedorActual.innerHTML="";
    let botonComprobar = document.createElement("button");
    botonComprobar.innerHTML="Comprobar"
    botonComprobar.style.height='100%';
    botonComprobar.style.width='80px';
    botonComprobar.style.borderRadius='10px';
    botonComprobar.style.border='0';
    botonComprobar.style.margin='0px';

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

    hasGanado(combinacion,tiradaActual);

    if (contadorIntento<7 && !partidaGanada){
    mostrarBotonComprobar("contenedorComprobarYaciertos"+contadorIntento);
    }  

    if (partidaGanada){

        let partidaGanada = document.createElement('div');
        let felicitacion = document.createElement('h1');
        felicitacion.innerHTML='FELICIDADES, HAS GANADO';
        let cont = document.getElementById('info');
        cont.appendChild(partidaGanada).appendChild(felicitacion);
        
    }

    });
    contenedorActual.appendChild(botonComprobar);
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
    return tiradaAciertos;
}

function hasGanado(array1,array2){
    partidaGanada = array1.every((valor, index) => valor ===array2[index]);
    console.log('Partida ganada? ' +partidaGanada)
}

function volverEmpezar(){
    location.reload();
}
