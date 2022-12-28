

export const determinarGanador = (puntosJugadores,divResultado) =>{
  

    //Desestructuracion de arreglos para extraer los puntos de los jugadores
    const [puntosJugador, puntosComputadora ] = puntosJugadores;    
    
        // Los alerts se ejecutan antes de que se termine de repartir las cartas, para evitar eso podemos ejecutar un setTime
         setTimeout(()=>{ //Ejecuta el callback en una cierta cantidad de tiempo
    
            if((puntosJugador === undefined) && (puntosComputadora === undefined)){
                divResultado.innerText= '';
            }else
     if((puntosJugador > puntosComputadora) && (puntosJugador <= 21) || (puntosComputadora > 21)){
                // alert('Has ganado')
                divResultado.innerText='¡Has ganado!'
                
            }else if((puntosJugador === puntosComputadora)){
                // alert('Empate')
                divResultado.innerText='¡Empate!'
                
            }else{
                // alert('Has perdido')
                divResultado.innerText='¡Has perdido!'

                
            }
         }, 10); //Se ejecuta en 10 milesimas de segundo
    }