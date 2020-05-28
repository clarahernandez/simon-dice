const INTENTOS = 10;
const COLORES = ['rojo', 'verde', 'amarillo', 'azul'];

document.querySelector('#boton-empezar').onclick = function (event) {
    ocultarBotonEmpezar();
    mostrarBotonReiniciar();

    empezar();
    event.preventDefault();
};

function ocultarBotonEmpezar() {
    document.querySelector('#boton-empezar').className = 'btn btn-outline-success oculto';
}

function mostrarBotonReiniciar() {
    document.querySelector('#boton-reiniciar').className = 'btn btn-outline-danger';
}

function empezar() {
    let simonDice = []; //lista de colores
    simonDice = agregarPaso(simonDice);
    simonDice = agregarPaso(simonDice);
    reproducir(simonDice);
}

function agregarPaso(lista) {
    const numeroRandom = Math.floor(Math.random() * 4);
    const color = COLORES[numeroRandom];

    lista.push(color);
    return lista;
}

function reproducir(lista) {
    let idTime = setInterval(function () {
        mostrarColores(lista);
    }, 3000);

    console.log(lista);

    let i = 0;
    function mostrarColores(lista) {
        console.log(lista[0]);
        let $color = document.querySelector(`#${lista[i]}`);

        if (i === lista.length) {
            clearInterval(idTime);
        } else {
            $color.classList.replace(`${lista[i]}-apagado`, `${lista[i]}-prendido`);
            setTimeout(function () {
                $color.classList.replace(`${lista[i]}-prendido`, `${lista[i]}-apagado`);
                i++;
            }, 2000);
        }
    }
}

function imprimirLista() {
    let lista = [1, 2, 3, 4];
    let recorrido = 0;
    let idTime = setInterval(imprimir, 3000);
    function imprimir() {
        if (recorrido === lista.length) {
            clearInterval(idTime);
        } else {
            recorrido++;
            console.log(recorrido);
        }
    }
}
