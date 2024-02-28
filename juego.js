var recibirParametros = new URLSearchParams(window.location.search);
var nivel = recibirParametros.get('niv');
var colores = recibirParametros.get('col');

let colores = new Map();

colores.set(1,'#ff6961');
colores.set(2,'#08cad1');
colores.set(3,'#f8f38d');
colores.set(4,'#42d6a4');
colores.set(5,'#9d94ff');
colores.set(6,'#ffb480');
colores.set(7,'#c780e8');
colores.set(8,'#59adf6');

console.log(nivel);
console.log(colores);

function crearPardida(){
    //Crear combinación correcta
}

function crearFilaPartida(){

}

function comprobarIntento(){

}