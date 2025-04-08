import { getColorByType } from './utils.js';

export function renderPokemonCard(pokemon) {
  const bgColor = getColorByType(pokemon.types[0].type.name);

  return /*html*/ `
    <div class="pokemon-card" style="background-color: ${bgColor}" data-id="${pokemon.id}">
      <h2>#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      
      <div class="types">
        ${pokemon.types.map(t => {
          const typeName = t.type.name;
          const color = getColorByType(typeName);
          return `<span class="type-badge" style="background-color: ${color}">${typeName}</span>`;
        }).join('')}
      </div>
    </div>
  `;
}

export function renderPokemonList(pokemonArray) {
  const container = document.getElementById('characters');

  // Pokémon nach ID sortieren
  const sorted = [...pokemonArray].sort((a, b) => a.id - b.id);

  const html = sorted.map(renderPokemonCard).join('');
  container.innerHTML += html;
}
