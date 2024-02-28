var nivel=4;
var color=4;

function comprobarCheckbox(checkbox) {
    var checkboxes = document.getElementsByName('color');
    var cantidad = 0;
    checkboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = false;
        }
        if (cb.checked){
            cantidad++;
        }

        if (cantidad === 0){
            checkbox.checked = true;
        }
    });
}

function seleccionarNivel(val){
    nivel=val;
}

function seleccionarColores(color){
    color=color;
    console.log(color);
}

function empezarJuego(){
    window.location.href = "juego.html?niv=" + encodeURIComponent(nivel) + "&col=" + encodeURIComponent(color);
}