const allPokemonIds = [...Array(1025).keys()].map(n => n + 1);
const allPokemonGrid = document.getElementById("all-pokemon-grid");

// Your shiny collection (UNCHANGED)
const pokemonIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18,
  // … rest of your list
  1008
];

// Convert to Set for fast lookup
const shinySet = new Set(pokemonIds);

// Counts
document.getElementById("all-pokemon-count").innerText =
  allPokemonIds.length + " REGISTERED";

document.getElementById("pokemon-count").innerText =
  pokemonIds.length + " SHINY FORMS";

async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const isShiny = shinySet.has(id);

  return {
    id,
    name: data.name,
    imgSrc: isShiny
      ? data.sprites.front_shiny
      : data.sprites.front_default
  };
}

async function loadAllPokemon() {
  const promises = allPokemonIds.map(fetchPokemon);
  const pokemonData = await Promise.all(promises);

  pokemonData.forEach(pokemon => {
    const img = document.createElement("img");
    img.src = pokemon.imgSrc;
    img.alt = pokemon.name;
    img.loading = "lazy";

    // Optional: add a class if shiny (nice for CSS styling)
    if (shinySet.has(pokemon.id)) {
      img.classList.add("shiny");
    }

    allPokemonGrid.appendChild(img);
  });
}

loadAllPokemon();
	
	// Section Switching Functions
function showSection1() {
  document.getElementById("section2-button").className = "buttonoff";
  document.getElementById("section1-button").className = "selectedbutton";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section1").style.display = "block";
};

function showSection2() {
  document.getElementById("section2-button").className = "selectedbutton";
  document.getElementById("section1-button").className = "buttonoff";
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "block";
};