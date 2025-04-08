const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0'
  };
  
  export function getColorByType(type) {
    return typeColors[type] || '#68A090';
  }
  
  export function setupLazyLoading(callback) {
    window.addEventListener('scroll', () => {
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (scrollBottom) {
        callback();
      }
    });
  }
  