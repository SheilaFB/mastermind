var recibirParametros = new URLSearchParams(window.location.search);
var nivel = recibirParametros.get('niv');
var colores = recibirParametros.get('col');

console.log(nivel);
console.log(colores);

