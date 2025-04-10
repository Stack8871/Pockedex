import { getColorByType } from './utils.js';

// Pokémon global merken
window.allPokemon = window.allPokemon || [];
let currentIndex = 0;

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
  const sorted = [...pokemonArray].sort((a, b) => a.id - b.id);
  const html = sorted.map(renderPokemonCard).join('');
  container.innerHTML += html;
}

export function setupOverlay() {
  const overlay = document.getElementById('overlay');
  const backdrop = document.getElementById('overlay-backdrop');
  const details = document.getElementById('pokemon-details');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');

  document.addEventListener('pokemonDataLoaded', (e) => {
    const incoming = e.detail;
    const newOnes = incoming.filter(p =>
      !window.allPokemon.some(existing => existing.id === p.id)
    );
    window.allPokemon = [...window.allPokemon, ...newOnes];
  });

  document.getElementById('characters').addEventListener('click', (e) => {
    const card = e.target.closest('.pokemon-card');
    if (!card) return;
    const id = +card.dataset.id;
    openOverlayById(id);
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < window.allPokemon.length - 1) {
      currentIndex++;
      showOverlayContent(window.allPokemon[currentIndex]);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showOverlayContent(window.allPokemon[currentIndex]);
    }
  });

  backdrop.addEventListener('click', () => {
    overlay.classList.remove('show');
  });

  function openOverlayById(id) {
    currentIndex = window.allPokemon.findIndex(p => p.id === id);
    if (currentIndex === -1) return;
    showOverlayContent(window.allPokemon[currentIndex]);
    overlay.classList.add('show');
  }

  function showOverlayContent(pokemon) {
    const types = pokemon.types.map(t =>
      `<span class="type-badge">${t.type.name}</span>`).join('');

    const stats = pokemon.stats;
    const hp = stats.find(s => s.stat.name === 'hp').base_stat;
    const attack = stats.find(s => s.stat.name === 'attack').base_stat;
    const defense = stats.find(s => s.stat.name === 'defense').base_stat;

    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    document.getElementById('pokemon-details').innerHTML = `
      <h2>#${pokemon.id} ${name}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${name}">
      <p>Typen: ${types}</p>
      <p>HP: ${hp}</p>
      <p>Attack: ${attack}</p>
      <p>Defense: ${defense}</p>
    `;
  }
}
document.getElementById('searchInput').addEventListener('input', (e) => {
  const search = e.target.value.toLowerCase().trim();
  const container = document.getElementById('characters');
  container.innerHTML = '';

  const filtered = window.allPokemon.filter(p => {
    return (
      p.name.toLowerCase().includes(search) ||
      String(p.id).includes(search)
    );
  });

  renderPokemonList(filtered);
});
