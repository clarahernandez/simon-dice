const RONDAS_MAX = 10;
let simonDice = []; //lista de colores a seguir
let ronda = 0;

document.querySelector('#boton-empezar').onclick = comenzarJuego;

document.querySelector('#boton-reiniciar').onclick = reiniciarJuego;

function reiniciarJuego() {
    bloquearInputUsuario();
    ocultarBotonReiniciar();
    mostrarBotonEmpezar();
    actualizarEstado('secondary', '¡Tocá en empezar para jugar!');
    actualizarRonda('-');
    ronda = 0;
    simonDice = [];
    usuarioDice = [];
}

function comenzarJuego() {
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();
    manejarRonda();
}

function manejarRonda() {
    if (ronda === RONDAS_MAX) {
        ganar();
        return;
    }
    bloquearInputUsuario();
    actualizarEstado('dark', 'Es el turno de la máquina.');
    actualizarRonda(ronda);
    const RETRASO_TURNO_JUGADOR = (simonDice.length + 1) * 1000;
    simonDice = agregarPaso(simonDice);
    reproducir(simonDice);

    setTimeout(function () {
        actualizarEstado('primary', 'Es tu turno.');
        desbloquearInputUsuario();
    }, RETRASO_TURNO_JUGADOR);

    ronda++;
    usuarioDice = [];
}

function reproducir(lista) {
    lista.forEach(function ($cuadro, index) {
        const RETRASO = (index + 1) * 1000;
        setTimeout(function () {
            resaltar($cuadro);
        }, RETRASO);
    });
}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = function () {}; //Le digo que cuando haga click no pase nada.
    });
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function ($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
}

function manejarInputUsuario(e) {
    const $cuadroUsuario = e.target;
    resaltar($cuadroUsuario);
    usuarioDice.push($cuadroUsuario);

    const $cuadroSimon = simonDice[usuarioDice.length - 1];

    if ($cuadroUsuario.id !== $cuadroSimon.id) {
        perder();
        return;
    }
    if (usuarioDice.length === simonDice.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }
}

function perder() {
    actualizarEstado('warning', '¡Perdiste!');
    bloquearInputUsuario();
    setTimeout(function () {
        reiniciarJuego();
    }, 3000);
}

function actualizarEstado(clase, texto) {
    const $estado = document.querySelector('#estado');
    $estado.textContent = texto;
    $estado.className = `col-sm-8 alert alert-${clase}`;
}

function ganar() {
    bloquearInputUsuario();
    actualizarEstado('success', '¡Ganaste!');
    setTimeout(function () {
        reiniciarJuego();
    }, 3000);
}

function agregarPaso(lista) {
    const numeroRandom = Math.floor(Math.random() * 4);
    const $cuadros = document.querySelectorAll('.cuadro');
    lista.push($cuadros[numeroRandom]);
    return lista;
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function () {
        $cuadro.style.opacity = 0.5;
    }, 500);
}

function ocultarBotonEmpezar() {
    document.querySelector('#boton-empezar').className = 'btn btn-outline-success oculto';
}

function mostrarBotonReiniciar() {
    document.querySelector('#boton-reiniciar').className = 'btn btn-outline-danger';
}

function mostrarBotonEmpezar() {
    document.querySelector('#boton-empezar').className = 'btn btn-outline-success';
}

function ocultarBotonReiniciar() {
    document.querySelector('#boton-reiniciar').className = 'btn btn-outline-danger oculto';
}

function actualizarRonda(ronda) {
    document.querySelector('#ronda').textContent = `Ronda: ${ronda}`;
}
