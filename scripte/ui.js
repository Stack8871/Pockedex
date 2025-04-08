import { getColorByType } from './utils.js';

export function renderPokemonCard(pokemon) {
  const types = pokemon.types.map(t => t.type.name).join(', ');
  const bgColor = getColorByType(pokemon.types[0].type.name);

  return /*html*/ `
    <div class="pokemon-card" style="background-color: ${bgColor}" data-id="${pokemon.id}">
      <h2>#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      <p>Typ: ${types}</p>
    </div>
  `;
}

export function renderPokemonList(pokemonArray) {
  const container = document.getElementById('characters');
  const html = pokemonArray.map(renderPokemonCard).join('');
  container.innerHTML += html;
}
