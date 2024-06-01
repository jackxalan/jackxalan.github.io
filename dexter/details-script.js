// Get the Pokemon number from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const pokemonNumber = urlParams.get('number');
const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`;

// Fetch the Pokemon details
fetch(pokemonUrl)
    .then(response => response.json())
    .then(pokemon => {
        const detailsContainer = document.getElementById('pokemon-details');
        const mainScreen = document.getElementById('main-screen');
        const pokemonNo = document.getElementById('pokemon-no');
        const pokemonName = document.getElementById('pokemon-name');
        const secondaryDisplay = document.getElementById('secondarydisplay')
        const TOTbox = document.getElementById('TOTbox')
        const HPbox = document.getElementById('HPbox')
        const ATKTbox = document.getElementById('ATKbox')
        const DEFbox = document.getElementById('DEFbox')
        const SATKbox = document.getElementById('SATKbox')
        const SDEFbox = document.getElementById('SDEFbox')
        const SPEbox = document.getElementById('SPEbox')
        const atkStat = pokemon.stats.find(stat => stat.stat.name === 'attack');
        const defStat = pokemon.stats.find(stat => stat.stat.name === 'defense');
        const satkStat = pokemon.stats.find(stat => stat.stat.name === 'special-attack');
        const sdefStat = pokemon.stats.find(stat => stat.stat.name === 'special-defense');
        const hpStat = pokemon.stats.find(stat => stat.stat.name === 'attack');
        const speStat = pokemon.stats.find(stat => stat.stat.name === 'speed');
        const totStat = (Number(atkStat.base_stat) + Number(defStat.base_stat) + Number(satkStat.base_stat) + Number(sdefStat.base_stat) + Number(hpStat.base_stat) + Number(speStat.base_stat))

        mainScreen.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="screenartwork">
      `;

        pokemonNo.innerHTML = `
      NO.<br>${pokemon.id}
  `;

       

        HPbox.innerHTML = `
        ${hpStat.base_stat}
       `;

        DEFbox.innerHTML = `
        ${defStat.base_stat}
       `;

        SATKbox.innerHTML = `
        ${satkStat.base_stat}
        `;

        SDEFbox.innerHTML = `
        ${sdefStat.base_stat}
         `;

        SPEbox.innerHTML = `
        ${speStat.base_stat}
        `;

        ATKbox.innerHTML = `
        ${atkStat.base_stat}
        `;

        TOTbox. innerHTML = `
        ${totStat}
        `;


        // Fetch species data for flavor text
        fetch(speciesUrl)
            .then(response => response.json())
            .then(species => {
                const flavorText = species.flavor_text_entries.find(entry => entry.language.name === 'en');
                const genus = species.genera.find(entry => entry.language.name === 'en');

                formatFT = flavorText.flavor_text.replace("\f", " ")

                 // Display the Pokemon name in all caps
        pokemonName.innerHTML = `
        ${pokemon.name.toUpperCase()}<br>${genus.genus}
       `;

                if (flavorText) {
                    secondaryDisplay.innerHTML = `
                   ${formatFT}
                `;
                }
            })
            .catch(error => console.error('Error fetching species details:', error));
    })
    .catch(error => console.error('Error fetching Pokemon details:', error));
