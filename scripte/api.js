const API_URL = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Lädt eine Liste von Pokémon mit Detaildaten.
 * 
 * @param {number} offset - Startindex
 * @param {number} limit - Wie viele Pokémon sollen geladen werden
 * @returns {Promise<Array>} - Array mit vollständigen Pokémon-Objekten
 */
export async function loadPokemonData(offset = 0, limit = 30) {
  const res = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  const details = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    })
  );

  return details;
}
