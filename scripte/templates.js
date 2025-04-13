import { getColorByType } from './utils.js';

export function createPokemonCardHTML(pokemon) {
  const bgColor = getColorByType(pokemon.types[0].type.name);
  const typesHTML = pokemon.types.map(t => {
    const typeName = t.type.name;
    const color = getColorByType(typeName);
    return `<span class="type-badge" style="background-color: ${color}">${typeName}</span>`;
  }).join('');

  return /*html*/ `
    <div class="pokemon-card" style="background-color: ${bgColor}" data-id="${pokemon.id}">
      <h2>#${pokemon.id} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
      <div class="types">${typesHTML}</div>
    </div>
  `;
}

export function createOverlayContentHTML(pokemon) {
  const types = pokemon.types.map(t =>
    `<span class="type-badge">${t.type.name}</span>`).join('');

  const stats = pokemon.stats;
  const hp = stats.find(s => s.stat.name === 'hp').base_stat;
  const attack = stats.find(s => s.stat.name === 'attack').base_stat;
  const defense = stats.find(s => s.stat.name === 'defense').base_stat;

  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return `
    <h2>#${pokemon.id} ${name}</h2>
    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${name}">
    <p>Typen: ${types}</p>
    <p>HP: ${hp}</p>
    <p>Attack: ${attack}</p>
    <p>Defense: ${defense}</p>
  `;
}
