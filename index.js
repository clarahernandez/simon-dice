const NIVELES_MAX = 5;
const COLORES = ['rojo', 'verde', 'amarillo', 'azul'];

document.querySelector('#boton-empezar').onclick = function (event) {
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();

    empezar();
    event.preventDefault();
};

document.querySelector('#boton-reiniciar').onclick = function (event) {
    ocultarBotonReiniciar();
    mostrarBotonEmpezar();
    event.preventDefault();
};

function empezar() {
    let simonDice = []; //lista de colores a seguir
    let numeroNivel = 0;
    let acerto = true;
    while (numeroNivel < NIVELES_MAX && acerto) {
        simonDice = agregarPaso(simonDice);
        reproducir(simonDice);
        acerto = turnoJugador(simonDice);
    }
}

function turnoJugador(simonDice) {
    console.log('turno del jugador');
    let jugadorDice = [];
    let acerto = true;
    for (let i = 0; acerto && i < simonDice.length; i++) {
        jugadorDice = agregaColorJugador(jugadorDice);
        acerto = simonDice[i] === jugadorDice[i]; //Nos fijamos que lo que haya puesto el jugador sea igual a lo que simón dice.
    }
    return acerto;
}

function agregaColorJugador(lista) {
    document.querySelectorAll('.cuadro').forEach(function (cuadro) {
        cuadro.addEventListener('click', function () {
            lista.push(cuadro.id);
        });
    });
    console.log(lista);
    return lista;
}

function agregarPaso(lista) {
    const numeroRandom = Math.floor(Math.random() * 4);
    const color = COLORES[numeroRandom];

    lista.push(color);
    return lista;
}

function reproducir(lista) {
    lista.forEach(function ($cuadro, index) {
        const RETRASO = (index + 1) * 1000;
        setTimeout(function () {
            resaltar($cuadro);
        }, RETRASO);
    });
}

function resaltar(cuadro) {
    let $cuadro = document.querySelector(`#${cuadro}`);
    $cuadro.classList.replace(`${cuadro}-apagado`, `${cuadro}-prendido`);
    setTimeout(function () {
        $cuadro.classList.replace(`${cuadro}-prendido`, `${cuadro}-apagado`);
    }, 1000);
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
