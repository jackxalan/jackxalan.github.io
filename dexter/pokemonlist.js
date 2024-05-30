// Fetch the JSON data from the URL
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        const pokemonList = document.getElementById('pokemon-list');
        const searchInput = document.getElementById('pokemon-search');

        // Function to filter Pokémon based on search input
        const filterPokemon = () => {
            const searchText = searchInput.value.toLowerCase();
            data.results.forEach((pokemon, index) => {
                const pokemonName = pokemon.name.replace(/-F/g, '♀').replace(/-M/g, '♂');
                const isVisible = pokemonName.toLowerCase().includes(searchText);
                const divItem = document.getElementById(`pokemon-${index + 1}`);
                divItem.style.display = isVisible ? 'flex' : 'none';
            });
        };

        // Listen for changes in the search input
        searchInput.addEventListener('input', filterPokemon);

        data.results.forEach((pokemon, index) => {
            const divItem = document.createElement('div');
            divItem.id = `pokemon-${index + 1}`;
            divItem.classList.add('pokemon-item');
            divItem.style.cursor = 'pointer'; // Change cursor to pointer

            // Create the image element
            const image = new Image();
            const pokemonNumber = index + 1;
            image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
            image.alt = `Pokémon #${pokemonNumber}`;
            image.classList.add('pokemon-image'); // Add a class for styling

            // Create the Pokémon number element
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('pokemon-number');
            numberDiv.textContent = `# ${pokemonNumber.toString().padStart(3, '0')}`;

            const pokemonName = pokemon.name.replace(/-F/g, '♀').replace(/-M/g, '♂');
            pokemonName.replace(/-/g, ' ');

            // Create the Pokémon name link
            const link = document.createElement('a');
            link.href = `details.html?number=${pokemonNumber}`;
            link.classList.add('pokemon-name'); // Add a class for styling

            // Create a text node for the Pokémon name
            const nameTextNode = document.createTextNode(pokemonName);
            link.appendChild(nameTextNode); // Append the text node to the link

            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            arrow.textContent = '>';

            // Append the image, number, and name link to the container
            divItem.appendChild(image);
            divItem.appendChild(numberDiv);
            divItem.appendChild(link);
            divItem.appendChild(arrow);

            // Make the entire divItem clickable
            divItem.addEventListener('click', () => {
                window.location.href = link.href;
            });

            // Append the container to the Pokémon list
            pokemonList.appendChild(divItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
