const allPokemonIds = [...Array(1025).keys()].map(n => n + 1);
  const allPokemonGrid = document.getElementById("all-pokemon-grid");

  const allPokemonCount = allPokemonIds.length
	
	document.getElementById("all-pokemon-count").innerText = allPokemonCount + " REGISTERED";
  
async function fetchAllPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return { id, imgSrc: data.sprites.front_default, name: data.name };
    }

    async function loadAllPokemon() {
        const promises = allPokemonIds.map(fetchAllPokemon);
        const pokemonData = await Promise.all(promises); // Wait for all fetches to complete

        pokemonData.forEach(pokemon => {
            const img = document.createElement("img");
            img.src = pokemon.imgSrc;
            img.alt = pokemon.name;
            img.loading = 'lazy';
            allPokemonGrid.appendChild(img);
        });
    }

    loadAllPokemon();
	
	const pokemonIds = [3, 4, 5, 6, 9, 10, 13, 14, 15, 16, 17, 18, 23, 24, 25, 26, 27, 35, 36, 37, 38, 39, 40, 41, 42, 46, 47, 49, 53, 54, 55, 57, 58, 59, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 92, 93, 94, 95, 100, 101, 104, 105, 108, 111, 112, 113, 114, 115, 120, 121, 122, 123, 124, 125, 126, 128, 129, 130, 132, 133, 134, 135, 136, 137, 138, 139, 142, 143, 144, 145, 146, 147, 148, 149, 151, 155, 156, 157, 167, 168, 172, 173, 175, 176, 179, 180, 181, 183, 184, 185, 186, 187, 190, 193, 194, 196, 197, 198, 200, 201, 203, 205, 206, 207, 208, 211, 212, 214, 215, 216, 217, 220, 221, 223, 224, 225, 226, 227, 228, 229, 232, 233, 234, 239, 240, 242, 246, 247, 248, 251, 263, 265, 266, 267, 268, 269, 279, 280, 281, 282, 292, 297, 299, 302, 303, 305, 307, 308, 309, 310, 315, 319, 322, 330, 333, 334, 337, 338, 339, 340, 344, 355, 356, 357, 358, 359, 361, 362, 363, 364, 365, 373, 376, 384, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 487, 498, 501, 502, 503, 504, 505, 511, 515, 529, 530, 531, 543, 544, 545, 548, 549, 550, 568, 569, 570, 571, 579, 582, 586, 591, 596, 609, 618, 627, 628, 634, 635, 644, 647, 650, 651, 659, 661, 662, 663, 664, 665, 666, 667, 668, 670, 672, 673, 676, 677, 678, 679, 680, 681, 687, 688, 689, 694, 700, 701, 704, 705, 706, 711, 712, 713, 714, 722, 723, 724, 738, 744, 745, 754, 770, 778, 780, 807, 808, 809, 823, 826, 832, 833, 845, 848, 849, 853, 854, 855, 858, 861, 862, 863, 866, 869, 872, 874, 875, 877, 878, 879, 887, 888, 889, 890, 899, 900, 901, 902, 903, 904, 905, 909, 915, 916, 920, 921, 924, 928, 929, 932, 940, 946, 948, 949, 951, 953, 954, 958, 963, 971, 974, 976, 977, 978, 980, 981, 985, 986, 987, 1001, 1002, 1003, 1004, 1008]
    const grid = document.getElementById("pokemon-grid");
    const pokemonCount = pokemonIds.length
	
	document.getElementById("pokemon-count").innerText = pokemonCount + " SHINY FORMS";
	
    async function fetchPokemon(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return { id, imgSrc: data.sprites.front_shiny, name: data.name };
    }

    async function loadShinyPokemon() {
        const promises = pokemonIds.map(fetchPokemon);
        const pokemonData = await Promise.all(promises); // Wait for all fetches to complete

        pokemonData.sort((a, b) => pokemonIds.indexOf(a.id) - pokemonIds.indexOf(b.id)); // Sort by original ID order

        pokemonData.forEach(pokemon => {
            const img = document.createElement("img");
            img.src = pokemon.imgSrc;
            img.alt = pokemon.name;
            img.loading = 'lazy';
            grid.appendChild(img);
        });
    }

    loadShinyPokemon();
	
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