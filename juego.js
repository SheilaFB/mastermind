var recibirParametros = new URLSearchParams(window.location.search);
var nivel = recibirParametros.get('niv');
var colores = recibirParametros.get('col');
console.log('NIVEL: ' + nivel);
console.log('COLORES: ' + colores);

var numIntento = 0;
let mapColores = new Map();
let intentos = new Map();
let combinacion = crearCombinacion();
var tiradaAciertos = [];
var colorPintar=0;
comprobarIntento([1,1,1,1]);

mapColores.set(1,'#ff6961');
mapColores.set(2,'#08cad1');
mapColores.set(3,'#f8f38d');
mapColores.set(4,'#42d6a4');
mapColores.set(5,'#9d94ff');
mapColores.set(6,'#ffb480');
mapColores.set(7,'#c780e8');
mapColores.set(8,'#59adf6');

crearOpciones();
crearFilaPartida();


function crearOpciones(){
    let contenedorOpciones = document.getElementById("botonesOpciones");
    mapColores.forEach(function(value, key){
        let botonOpcion = document.createElement("button");
        botonOpcion.style.backgroundColor = value;
        botonOpcion.value=key;
        botonOpcion.style.width='40px';
        botonOpcion.style.height='40px';
        botonOpcion.style.borderRadius="20px";
        
        botonOpcion.addEventListener('click',function(){
            botonOpcion.classList.add("activo");
            console.log(key);
            colorPintar=key;
        });    
        contenedorOpciones.appendChild(botonOpcion);
        console.log(key)
        console.log(value)
    });
    
}

//Crear combinación correcta para adivinar
function crearCombinacion(){
    let comb = [];
    for (let i = 0; i < nivel; i++) {
        colorAleatorio = Math.floor(Math.random()*colores)+1;
        comb.push(colorAleatorio);
        console.log(colorAleatorio)
    }
    return comb;
}

function crearFilaPartida(){
    let idBoton = 1;
    let contenedor = document.getElementById("contenedor");
    //Contenedor de los botones
    let contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("contenedorBotones");
    //botones del contenedor, dependenderá del nivel
    for(let i = 0; i < nivel; i++){
        console.log("Entra");
        let boton=document.createElement("button");
        boton.id=`btn${idBoton}`;
        idBoton++;
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
    botonComprobar.addEventListener('click',function(){
        //Recorrer los botones para obtener sus valores
        var botonesIterar2 = document.getElementsByClassName('contenedorBotones');
            for (var i = 0; i < botonesIterar2.length; i++) {
                console.log(botonesIterar2[i].value)
            }
    });
    contenedor.appendChild(contenedorBotones);
    contenedor.appendChild(botonComprobar)
}


function comprobarIntento(arrayTirada){
    tiradaAciertos=[];
    numIntento++;
    intentos.set(numIntento,arrayTirada);
    console.log('Numero intento ' + intentos.size);
    for (let i = 0; i < nivel; i++) {
        if(combinacion.includes(arrayTirada[i])){
            console.log('Está en la combiacion')
            if(combinacion[i] === arrayTirada[i]){
                console.log('Y además has acertado')
                tiradaAciertos.push(1);
            }else {
                tiradaAciertos.push(2);
            }
        }else {
            console.log('No está en la combinación')
            tiradaAciertos.push(3);
        }  
    }

    for (let i = 0; i < tiradaAciertos.length; i++) {
        console.log('Tirada intento ' + tiradaAciertos[i]);
    }

}