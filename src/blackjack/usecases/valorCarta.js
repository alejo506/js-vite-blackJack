/**
 * Sustra el valor numérico de la carta
 * @param {String<String>} carta 
 * @returns {Number} el valor de la carta
 */

export const valorCarta = (carta) => {
    if( !carta || carta.lenght === 0 ) 
        throw new Error('carta es obligatoria como un string');
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
             ( valor === 'A' ) ? 11 : 10 :
              valor * 1;
}