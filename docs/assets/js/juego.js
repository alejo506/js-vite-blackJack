
//Usando una función anónima auto invocada o nuestro módulo
const miModulo = (()=>{

//Le dice a JS que sea estricto al evaluar su codigo
'use strict'


// 1. Creamos el arreglo deck(Este contendrá nuestras cartas). Como cambia lo definimos con "let"
let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['J', 'Q', 'K', 'A'];


//3. Eventos
let puntosJugadores = []

//Referencias al HTML

//Obtener botones desde HTML
const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

//Obtener todos las etiquetas desde HTML
const divSmall= document.querySelectorAll('small'),
        divCartasJugadores= document.querySelectorAll('.divCartas'),
        divResultado = document.querySelector('strong');
// --------------------------------------------------------------------------------------------------------


//Esta función inicializa el juego. Al inializar el juego podemos pedir un numero de jugadores. Si pongo (numjugadores=1) significa que por defecto va haber un 1 jugador por defecto
const inicializarJuego = (numJugadores = 2) => {

    deck = crearDeck();
    //Reinicializar
    puntosJugadores=[];

    //Nuestro ultimo jugador sieempre va hacer la computadora  
    for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        //Recorre las etiquetas y pone cero, eso lo hacemos con el callback que va dentro de forEach(elem)
        divSmall.forEach( elem => elem.innerText = 0 );

        divCartasJugadores.forEach(elem => elem.innerText = '' );
        divResultado.innerHTML='';
        
        btnPedir.disabled= false;
        // btnDetener.disabled = false;
        
}


// ------------------------------------------------------------------------------------

// 2. FUNCION Crear un nuevo deck(baraja)
const crearDeck = () => {
 
    //Vaciar el deck//Si no se vacia se acumula al crear otro nuevo
    deck=[];
    //3. Obtener las cartas y agregarlos a arr deck
    for (let i = 2; i <= 10; i++) {
        // 4. Agrega el valor que tenga "i" y concatena con los tipos
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }
    // 5. Unir especiales con tipos
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // 6. Descargamos y usamos una librearia para que los numeros de nuestro arreglo se mezclen y sean aleatorios. Desde https://underscorejs.org/#
    return _.shuffle(deck);
}



// ----------------------------------------------------------------------------------------------

// 7. FUNCION me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    //8.Toma la primer carta 
    return deck.shift();
}

// ------------------------------------------------------------------------------------
// 10. FUNCION para obtener el valor de la carta 
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
             ( valor === 'A' ) ? 11 : 10 :
              valor * 1;
}
// ------------------------------------------------------------------------------------

// const valorCartaFuncion = valorCarta(pedirCarta());

//Tenemos que saber el turno para acumulacion de puntos
//Turno: 0 = primer jugador y el último será computadora
//Turno recibe los numeros de posiciones de los jugadores del arrelo puntosjugadores y recibimos también el valor de la carta
const acumularPuntos = (carta, turno) =>{

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)

    divSmall[turno].innerText = puntosJugadores[turno];
    
    return puntosJugadores[turno]
}

// ------------------------------------------------------------------------------------

//Ocupamos la carta y el div donde necesitamos color la carta creada
const crearCarta = (carta, turno) => {
       const imgCarta= document.createElement('img');
        imgCarta.src= `assets/cartas/${ carta }.png`; //Le agregamos la propiedad src
        imgCarta.classList.add('carta')  
        divCartasJugadores[turno].append(imgCarta);
}

// ------------------------------------------------------------------------------------

const determinarGanador = () =>{

//Desestructuracion de arreglos para extraer los puntos de los jugadores
const [puntosJugador, puntosComputadora ] = puntosJugadores;    


    // Los alerts se ejecutan antes de que se termine de repartir las cartas, para evitar eso podemos ejecutar un setTime
    setTimeout(()=>{ //Ejecuta el callback en una cierta cantidad de tiempo

        if((puntosJugador > puntosComputadora) && (puntosJugador <= 21) || (puntosComputadora > 21)){
            // alert('Has ganado')
            divResultado.innerText='Has ganado'
        }else if((puntosJugador === puntosComputadora)){
            // alert('Empate')
            divResultado.innerText='Empate'
            
        }else{
            // alert('Has perdido')
            divResultado.innerText='Has perdido'
        }
    }, 10); //Se ejecuta en 10 milesimas de segundo
}

// ------------------------------------------------------------------------------------

// TURNO DE LA COMPUTADORA
// Hasta Detener o hasta que el jugador llegue a 21 la computador tiene su oportunidad
const turnoComputadora = ( puntosminimosJugador )=>{ //Recibe los Puntos minimos deljugador para que la computadora lo iguale

    let puntosComputadora = 0;


    //Ocupamos un while o do while, lo que necesitamos es que se ejeute al menos 1 vez, porque la computadora necesita almenos 1 carta para superar al usuario
    do {
        //Pide una carta
        const carta = pedirCarta();

        //Envia la carta, Y coloca los puntos de la computadora siempre al final del arreglo
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
        
        //Enviamos la carta y el turno del jugador
        crearCarta(carta, puntosJugadores.length-1);
 
    } while( (puntosComputadora < puntosminimosJugador) && (puntosminimosJugador <= 21));
    
    
    determinarGanador();


}

// ------------------------------------------------------------------------------------

//2. Eventos. 
//Escuchar un evento /(event, funcion), La funcion es un callback, una funcion que se envia por argumento. Puede ser una funcion de flecha
btnPedir.addEventListener('click',()=>{

    // console.log('click')
    // 4 Eventos
    const carta = pedirCarta();

    // 5.Eventos. Incrementar los puntos que tiene el jugador más el valor de la carta
    //Como no tenemos jugadores agregamos la posicion 0
    const puntosJugador= acumularPuntos(carta ,0);

    //Creamos la carta para el jugador, en este caso el jugador en la posicion 0
    crearCarta(carta, 0);


    //Evaluar si jugador tuvo más de 21 puntos y bloquear boton
  
   
    if((puntosJugador > 21) || (puntosJugador === 21)){
        // console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );//Ejecuta el turno de la computadora
    } 


});


//Logica btnDetener
btnDetener.addEventListener('click', ()=> {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
});


btnNuevo.addEventListener('click', ()=>{

   inicializarJuego();

});


})();






