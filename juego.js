//Comprueba que los valores sean válidos
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

//Mapa que guarda como clave el numIntento y como valor el array de la tirada
let intentos = new Map();

//Combinación creada por la máquina para adivinar
let combinacion = crearCombinacion();

//Al comprobar la tirada, habrá aciertos y fallos. Se guardarán en este array
var tiradaAciertos = [];

//variable para recoger el valor de un botón
var colorPintar=0;

//contadorIntento
var contadorIntento = 0;

//boleano para partida ganada;
var partidaGanada = false;

//Colores del juego
const coloresJuego = {
    1: {codigoHex: '#FF0000', nombre: 'Rojo'},
    2: {codigoHex: '#FFA500', nombre: 'Naranja'},
    3: {codigoHex: '#FFFF00', nombre: 'Amarillo'},
    4: {codigoHex: '#00FF00', nombre: 'Verde'},
    5: {codigoHex: '#0000FF', nombre: 'Azul'},
    6: {codigoHex: '#4B0082', nombre: 'Morado'},
    7: {codigoHex: '#EE82EE', nombre: 'Violeta'},
    8: {codigoHex: '#FF007F', nombre: 'Rosa'}
};

//Comprueba que los parámetros sean correctos para evitar errores
if((nivel==4||nivel==6) && (colores==6 || colores==8) && (permitirDuplicados==0 || permitirDuplicados==1)){
crearOpciones();
crearPartida();
} else {
    let contenedorError = document.getElementById('contenedor');
    let error = document.createElement('h1');
    error.innerHTML='404. NOT FOUND';
    contenedorError.appendChild(error);
}

//funcion para crear un botón con el color pasado por parámetro
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
        let botonOpcion = componenteBoton(coloresJuego[i].codigoHex);
        botonOpcion.value=i;
        botonOpcion.setAttribute('aria-label',`Seleccionar color ${coloresJuego[i].nombre}`);
        
        //Cuando se pulsa un botón cambia el estilo para remarcar cual ha sido pulsado
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
            comb.push(colorAleatorio); 
        } else {
            if (!comb.includes(colorAleatorio)){
                comb.push(colorAleatorio); 
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

    //Contenedor del botón de comprobar y de los aciertos
    let contenedorComprobarYaciertos = document.createElement("div");
    contenedorComprobarYaciertos.classList.add('intento');
    contenedorComprobarYaciertos.id = "contenedorComprobarYaciertos"+numFila;

    //Contenedor para mostrar si ha ganado o perdido la partida
    let informacionPartida = document.createElement('div');
    informacionPartida.id='info';

    //crea los botones del contenedor, dependenderá del nivel (4 o 6 botones)
    for(let i = 0; i < nivel; i++){
        let boton=componenteBoton('#FFFFF');

        //Pinta el botón con el color seleccionado y añade el valor
        boton.addEventListener('click',function(){
            if(colorPintar != 0){
                boton.style.backgroundColor = coloresJuego[colorPintar].codigoHex;
                boton.setAttribute('aria-label',`Color ${coloresJuego[colorPintar].nombre}`);
                boton.value=colorPintar;
                colorPintar=0;
                //Quita el estilo activo del color seleccionado previamente
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
    
    //Al iniciar el juego, se muestra en la primera fila el botón comprobar
    if (numFila==0){
        mostrarBotonComprobar('contenedorComprobarYaciertos'+contadorIntento);
    }
}

//función para mostrar el botón comprobar
function mostrarBotonComprobar(contenedorMostrarBoton){
    console.log(contenedorMostrarBoton);
    var contenedorActual = document.getElementById(contenedorMostrarBoton);
    //Limpiamos el contenedor
    contenedorActual.innerHTML="";

    //Creamos el botón
    let botonComprobar = document.createElement("button");
    botonComprobar.innerHTML="Comprobar"
    botonComprobar.style.height='100%';
    botonComprobar.style.width='80px';
    botonComprobar.style.borderRadius='10px';
    botonComprobar.style.border='0';
    botonComprobar.style.margin='0px';
    botonComprobar.setAttribute('aria-label','Botón para comprobar la combinación');

    //creamos un array para guardar la combinación propuesta
    var tiradaActual= []

    //Recogemos los valores de la combinación y los guardamos en el array

    botonComprobar.addEventListener('click',function(){

    var botonesValores = document.getElementById('contenedorBotones'+contadorIntento).childNodes;
    for (var i = 0; i < botonesValores.length; i++) {
        tiradaActual.push(parseInt(botonesValores[i].value));
    }
    
    //Comprueba los aciertos y errores
    let aciertos = comprobarIntento(tiradaActual);
    mostrarAciertos("contenedorComprobarYaciertos"+contadorIntento, aciertos);

    contadorIntento++;
    console.log('Contador Intento ' + contadorIntento)

    //Llama al método para comprobar si ha ganado
    hasGanado(combinacion,tiradaActual);

    //Si aún quedan intentos y no ha ganado, se añade el botón comprobar a la siguiente fila de intento
    if (contadorIntento<7 && !partidaGanada){
    mostrarBotonComprobar("contenedorComprobarYaciertos"+contadorIntento);
    }  

    //Contenedor para mostrar si ha ganado o perdido. Lo añade como hijo del contenedor "info" creado anteriormente
    let resultadoPartidaDiv = document.createElement('div');
    let mensaje = document.createElement('h1');
    let cont = document.getElementById('info');
    
    //Si ha ganado, muestra el mensaje correspondiente
    if (partidaGanada){   
        mensaje.innerHTML='¡Has ganado!';
        mensaje.setAttribute('aria-label','Felicidades, has ganado');    
    }

    //Si ha perdido, muestra el mensaje correspondiente
    if (contadorIntento==7 && !partidaGanada){
        mensaje.innerHTML='Inténtalo de nuevo';
        mensaje.setAttribute('aria-label','Inténtalo de nuevo');
    }
    cont.appendChild(resultadoPartidaDiv).appendChild(mensaje);   
    });
    contenedorActual.appendChild(botonComprobar);
}

//Muestra los aciertos y fallos. Recibe el contenedor donde los mostrará y el array que contiene el resultado de la función "comprobarIntento()"
function mostrarAciertos(contenedorMostrarAciertos, aciertosMostrar){

    //Creamos una cadena de texto con el resultado para el aria-label
    let cadenaResultado = "";

    //Seleccionamos el contenedor donde mostraremos los resultados
    var contenedorActual = document.getElementById(contenedorMostrarAciertos);
    contenedorActual.innerHTML="";
    contenedorActual.classList.add('grid'+nivel,'aciertos');
    
    //Creamos el div donde añadiremos círculos de colores en función de si ha acertado o no
    var caja = document.createElement('div');

    for(let i = 0; i<nivel; i++){
        var caja = document.createElement('div');
        switch(aciertosMostrar[i]){
            case 3: 
                caja.style.backgroundColor='red';
                cadenaResultado+=`Posicion ${i} no es correcto.`;
            break;
            case 1: 
                caja.style.backgroundColor='green';
                cadenaResultado+=`Posicion ${i} es correcto.`;
            break;
            case 2:
                caja.style.backgroundColor='yellow';
                cadenaResultado+=`Posicion ${i} está en la combinación pero no en su lugar.`;
            break;
            default:
                caja.style.backgroundColor='white';
                cadenaResultado+=`Posicion ${i} hay algún error. Recargue la página`;
            break;
        }
        contenedorActual.setAttribute('aria-label',cadenaResultado);
        caja.style.width='10px';
        caja.style.height='10px';
        caja.style.borderRadius='5px';
        contenedorActual.appendChild(caja);
    }

}


//recibe un array con la combinación de colores seleccionada. Crea un nuevo array para guardar si está en la combinación correcta o no.
function comprobarIntento(arrayTirada){

    tiradaAciertos=[];
    numIntentoParaArray++;
    intentos.set(numIntentoParaArray,arrayTirada);
    
    for (let i = 0; i < nivel; i++) {
        numero=arrayTirada[i];
        if(combinacion.includes(numero)){ 

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
            //3 -> No está en la combinación
            tiradaAciertos.push(3);
        } 
        
    }
    return tiradaAciertos;
}

//Función para comprobar si ha ganado. Guarda el resultado en una variable.
function hasGanado(array1,array2){
    partidaGanada = array1.every((valor, index) => valor ===array2[index]);
}

//Función para recargar la página 
function volverEmpezar(){
    location.reload();
}
