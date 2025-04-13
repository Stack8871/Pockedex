import { createPokemonCardHTML, createOverlayContentHTML } from './templates.js';

window.allPokemon = window.allPokemon || [];
let currentIndex = 0;

export function renderPokemonList(pokemonArray) {
  const container = document.getElementById('characters');
  const sorted = [...pokemonArray].sort((a, b) => a.id - b.id);
  const html = sorted.map(createPokemonCardHTML).join('');
  container.innerHTML += html;
}

export function setupOverlay() {
  initOverlayElements();
  handlePokemonDataUpdate();
  registerCardClicks();
  registerOverlayNavigation();
  registerBackdropClick();
}

function initOverlayElements() {
  window.overlay = document.getElementById('overlay');
  window.backdrop = document.getElementById('overlay-backdrop');
  window.details = document.getElementById('pokemon-details');
  window.nextBtn = document.getElementById('next-btn');
  window.prevBtn = document.getElementById('prev-btn');
}

function handlePokemonDataUpdate() {
  document.addEventListener('pokemonDataLoaded', (e) => {
    const newOnes = e.detail.filter(p =>
      !window.allPokemon.some(existing => existing.id === p.id));
    window.allPokemon = [...window.allPokemon, ...newOnes];
  });
}

function registerCardClicks() {
  document.getElementById('characters').addEventListener('click', (e) => {
    const card = e.target.closest('.pokemon-card');
    if (!card) return;
    const id = +card.dataset.id;
    openOverlayById(id);
  });
}

function registerOverlayNavigation() {
  window.nextBtn.addEventListener('click', () => {
    if (currentIndex < window.allPokemon.length - 1) {
      currentIndex++;
      renderOverlayContent(window.allPokemon[currentIndex]);
    }
  });

  window.prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderOverlayContent(window.allPokemon[currentIndex]);
    }
  });
}

function registerBackdropClick() {
  window.backdrop.addEventListener('click', () => {
    window.overlay.classList.remove('show');
  });
}

function openOverlayById(id) {
  currentIndex = window.allPokemon.findIndex(p => p.id === id);
  if (currentIndex === -1) return;
  renderOverlayContent(window.allPokemon[currentIndex]);
  window.overlay.classList.add('show');
}

function renderOverlayContent(pokemon) {
  window.details.innerHTML = createOverlayContentHTML(pokemon);
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const search = e.target.value.toLowerCase().trim();
  const container = document.getElementById('characters');
  container.innerHTML = '';

  const filtered = window.allPokemon.filter(p =>
    p.name.toLowerCase().includes(search) || String(p.id).includes(search)
  );

  renderPokemonList(filtered);
});
