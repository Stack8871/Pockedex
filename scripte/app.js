import { loadPokemonData } from './api.js';
import { renderPokemonList } from './ui.js';
import { setupLazyLoading } from './utils.js';

let offset = 0;
const limit = 30;

/**
 * Initialisiert die Pokedex-App.
 * Lädt die ersten Pokémon und setzt Lazy Loading.
 */
export async function init() {
  const pokemon = await loadPokemonData(offset, limit);
  renderPokemonList(pokemon);
  setupLazyLoading(loadMorePokemon);
}

/**
 * Lädt weitere Pokémon beim Scrollen.
 */
async function loadMorePokemon() {
  offset += limit;
  const morePokemon = await loadPokemonData(offset, limit);
  renderPokemonList(morePokemon);
}
