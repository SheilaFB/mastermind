var nivel=4;
var color=6;
var permitir = 0;

function seleccionarNivel(val){
    nivel=val;
    if (nivel === 4){
        color=6;
    } else {
        color=8;
    }
}

function seleccionarColores(color){
    self.color=color;
    console.log(color);
}

function empezarJuego(){
    let cb = document.getElementById('cbDuplicar');

    if (cb.checked){
        permitir = 1;
    }

    window.location.href = "juego.html?niv=" + encodeURIComponent(nivel) + "&col=" + encodeURIComponent(color) + "&per=" + encodeURIComponent(permitir);
}