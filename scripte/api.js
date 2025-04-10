const API_URL = 'https://pokeapi.co/api/v2/pokemon';

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
