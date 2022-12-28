/**
 * 
 * @param {Array <String>} deck es un arrelo de string
 * @returns {String <String>}  retorna la carta del deck
 */

export const pedirCarta = (deck) => {
    if (!deck || deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    //8.Toma la primer carta 
    return deck.shift();
}