import { loadPokemonData } from './api.js';
import { renderPokemonList, setupOverlay } from './ui.js';
import { setupLazyLoading } from './utils.js';

let offset = 0;
const limit = 30;

export async function init() {
  if (offset >= 151) return;

  const pokemon = await loadPokemonData(offset, limit);
  renderPokemonList(pokemon);
  setupOverlay();
  document.dispatchEvent(new CustomEvent('pokemonDataLoaded', { detail: [...pokemon] }));
  setupLazyLoading(loadMorePokemon);
}

async function loadMorePokemon() {
  if (offset + limit >= 151) return;

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  offset += limit;
  const morePokemon = await loadPokemonData(offset, limit);
  renderPokemonList(morePokemon);
  document.dispatchEvent(new CustomEvent('pokemonDataLoaded', { detail: [...morePokemon] }));

  loader.style.display = 'none';
}
