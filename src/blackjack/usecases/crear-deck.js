import _ from "underscore";

/**
 * Esta función crear un nuevo deck
 * @param {array<String>} tiposDeCarta Ejemplo: ['C', 'D', 'H', 'S']
 * @param {array<String>} tiposEspeciales Ejemplo: ['J', 'Q', 'K', 'A']
 * @returns {array<String>} retorna un nuevo deck de cartas
 */

export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
   
    //Al subir el proyecto a Netlify muestra mensajes acer los Tipos, para eso hacemos este condicional. Si estuvierasmos trabajando con Typescript estos dos errores no habría que agregarlos
    if( !tiposDeCarta || tiposDeCarta.lenght === 0 ) 
        throw new Error('tiposDeCarta es obligatorio como un arreglo de string');

    if( !tiposEspeciales || tiposEspeciales.lenght === 0 ) 
        throw new Error('tiposEspeciales es obligatorio como un arreglo de string');

    //Vaciar el deck//Si no se vacia se acumula al crear otro nuevo
    let deck=[];
    //3. Obtener las cartas y agregarlos a arr deck
    for (let i = 2; i <= 10; i++) {
        // 4. Agrega el valor que tenga "i" y concatena con los tipos
        for (let tipo of tiposDeCarta) {
            deck.push(i + tipo)
        }
    }
    // 5. Unir especiales con tipos
    for (let tipo of tiposDeCarta) {
        for (let esp of tiposEspeciales) {
            deck.push(esp + tipo);
        }
    }
   deck= _.shuffle(deck);

    // 6. Descargamos y usamos una librearia para que los numeros de nuestro arreglo se mezclen y sean aleatorios. Desde https://underscorejs.org/#
    return deck
}