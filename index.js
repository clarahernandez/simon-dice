
document.querySelector('#boton-empezar').onclick = function (event) {
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();

    event.preventDefault();
}

function ocultarBotonEmpezar() {
    document.querySelector("#boton-empezar").className = "btn btn-outline-success oculto"
}

function mostrarBotonReiniciar() {
    document.querySelector("#boton-reiniciar").className = "btn btn-outline-danger"
}




function imprimirLista() {
    let lista = [1, 2, 3, 4];
    let largo = lista.length;
    let idTime = setInterval(imprimir, 3000);
}