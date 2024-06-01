// Get the Pokemon number from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const pokemonNumber = urlParams.get('number');
const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

// Fetch the Pokemon details
fetch(pokemonUrl)
    .then(response => response.json())
    .then(pokemon => {
        const detailsContainer = document.getElementById('pokemon-details');
        const mainScreen = document.getElementById('main-screen');
        const pokemonNo = document.getElementById('pokemon-no');
        const pokemonName = document.getElementById('pokemon-name');

        mainScreen.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="screenartwork">
      `;

      pokemonNo.innerHTML = `
      NO.<br>${pokemon.id}
  `;

  pokemonName.innerHTML = `
  ${pokemon.name}<br>CATEGORY
  `;

        detailsContainer.innerHTML = `
              <h1>Name: ${pokemon.name}</h1>
              <p>ID: ${pokemon.id}</p>
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
              <h2>Stats:</h2>
              <ul>
                  ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
              </ul>
              
              <!-- Add more details as needed -->
          `;
    })
    .catch(error => console.error('Error fetching Pokemon details:', error));