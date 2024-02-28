var recibirParametros = new URLSearchParams(window.location.search);
var nivel = recibirParametros.get('niv');
var colores = recibirParametros.get('col');
console.log('NIVEL: ' + nivel);
console.log('COLORES: ' + colores);

var numIntento = 0;
let arrayColores = new Map();
let intentos = new Map();
let combinacion = crearCombinacion();
comprobarIntento([6,5,3,2]);

arrayColores.set(1,'#ff6961');
arrayColores.set(2,'#08cad1');
arrayColores.set(3,'#f8f38d');
arrayColores.set(4,'#42d6a4');
arrayColores.set(5,'#9d94ff');
arrayColores.set(6,'#ffb480');
arrayColores.set(7,'#c780e8');
arrayColores.set(8,'#59adf6');

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

}

function comprobarIntento(arrayTirada){
    numIntento++;
    intentos.set(numIntento,arrayTirada);
    console.log('Numero intento ' + intentos.size);
    for (let i = 0; i < nivel; i++) {
        if(combinacion.includes(arrayTirada[i])){
            console.log('Está en la combiacion')
            if(combinacion[i] === arrayTirada[i]){
                console.log('Y además has acertado')
            }
        }else {
            console.log('No está en la combinación')
        }  
    }


    arrayTirada.forEach(function(element) {
        
    });
}