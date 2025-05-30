document.addEventListener("DOMContentLoaded", function () {
  const favoriteAlbums = document.querySelectorAll('.favorite.album');
  favoriteAlbums.forEach(album => {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '★';
    album.appendChild(star);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fortyFiveAlbums = document.querySelectorAll('.forty-five.album');
  fortyFiveAlbums.forEach(album => {
    const fortyfive = document.createElement('div');
    fortyfive.className = 'fortyfive';
    fortyfive.textContent = '4️⃣5️⃣';
    album.appendChild(fortyfive);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const extendedPlays = document.querySelectorAll('.ep.album');
  extendedPlays.forEach(album => {
    const extendedplay = document.createElement('div');
    extendedplay.className = 'extendedplay';
    extendedplay.textContent = '🇪';
    album.appendChild(extendedplay);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const miloAlbums = document.querySelectorAll('.milo.album');
  miloAlbums.forEach(album => {
    const miloalbum = document.createElement('div');
    miloalbum.className = 'miloalbum';
    miloalbum.textContent = '🧸';
    album.appendChild(miloalbum);
  });
});

const apiKey = '4526ca5104f6770580cbb773ede26961'; // Your TMDB API key

async function fetchMovieByTitleAndYear(title, year) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}${year ? `&year=${year}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0]; // Use the first result (filtered by year if available)
    } else {
      console.error(`No results found for "${title}" (${year || "unknown year"})`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie:', error);
  }
}

async function displayMovies() {
  const movieLinks = document.querySelectorAll('#movies-container a');

  for (const link of movieLinks) {
    const parts = link.id.split('|');
    const title = parts[0]; // Always exists
    const year = parts[1] || ""; // Use empty string if year is missing

    const movie = await fetchMovieByTitleAndYear(title, year);

    if (movie) {
      link.href = `https://www.themoviedb.org/movie/${movie.id}`;
      link.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      `;
    } else {
      console.error(`Movie data not found for "${title}" (${year || "unknown year"})`);
    }
  }
}

displayMovies();

// Fetch Shows by Title and Year
async function fetchShowByTitleAndYear(title, year) {
  try {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(title)}${year ? `&first_air_date_year=${year}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0]; // Use the first result (filtered by year if available)
    } else {
      console.error(`No results found for "${title}" (${year || "unknown year"})`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching show:", error);
    return null;
  }
}

// Display Shows
async function displayShows() {
  const showLinks = document.querySelectorAll("#shows-container a");

  for (const link of showLinks) {
    const parts = link.id.split('|');
    const title = parts[0]; // Always exists
    const year = parts[1] || ""; // Use empty string if year is missing

    const show = await fetchShowByTitleAndYear(title, year);

    if (show) {
      link.href = `https://www.themoviedb.org/tv/${show.id}`;
      link.innerHTML = `
        <img src="${show.poster_path
          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
          : "https://via.placeholder.com/500x750?text=No+Image"
        }" alt="${show.name}" loading="lazy">
      `;
    } else {
      console.error(`Show data not found for "${title}" (${year || "unknown year"})`);
    }
  }
}

displayShows();

// Show Section
function showSection(sectionNumber) {
  const totalSections = 6; // Update this if you add more sections

  for (let i = 1; i <= totalSections; i++) {
    const section = document.getElementById(`section${i}`);
    const button = document.getElementById(`section${i}-button`);

    if (i === sectionNumber) {
      section.style.display = "block";
      button.className = "selectedbutton";
    } else {
      section.style.display = "none";
      button.className = "buttonoff";
    }
  }
}

// Fetch Podcast Data
async function fetchPodcastData() {
  const container = document.getElementById('podcast-container');
  const podcastDivs = container.querySelectorAll('div');

  const podcastNames = Array.from(podcastDivs).map(div => div.id.toLowerCase());

  try {
    const requests = podcastNames.map(name =>
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=podcast`)
        .then(response => response.json())
        .then(data => data.results.find(podcast => podcast.collectionName.toLowerCase() === name))
    );

    const podcasts = await Promise.all(requests);

    // Insert the artwork into the respective divs
    podcasts.forEach((podcast, index) => {
      if (podcast) {
        // Create an anchor element
        const link = document.createElement('a');
        link.href = podcast.collectionViewUrl; // Podcast feed URL
        link.target = '_blank'; // Open in a new tab

        // Create an image element
        const image = document.createElement('img');
        image.src = podcast.artworkUrl600; // High-resolution artwork
        image.alt = `${podcast.collectionName} Podcast`;
        image.width = 300; // Adjust the width as needed

        // Append the image to the anchor
        link.appendChild(image);

        // Append the anchor to the respective div
        podcastDivs[index].appendChild(link);
      } else {
        console.error('Podcast not found.');
      }
    });
  } catch (error) {
    console.error('Error fetching podcast data:', error);
  }
}


const rawgApiKey = 'c378aad1f6114b89b29fe3836bb54bcd'; // Your RAWG API key

async function fetchGameByTitle(title) {
  try {
    const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(title)}&key=${rawgApiKey}`;
    console.log(`Fetching: ${url}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Data received for "${title}":`, data);

    if (data.results && data.results.length > 0) {
      return data.results[0]; // First match
    } else {
      console.error(`No results found for "${title}"`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    return null;
  }
}

async function displayGames() {
  const gameLinks = document.querySelectorAll('.games-container a');
  console.log("Found game links:", gameLinks);

  for (const link of gameLinks) {
    const title = link.dataset.title;
    if (!title) {
      console.error('Missing data-title attribute on element:', link);
      continue;
    }
    const game = await fetchGameByTitle(title);

    if (game) {
      // Set the link to the game website or fallback RAWG game URL.
      link.href = game.website || `https://rawg.io/games/${game.slug}`;
      link.innerHTML = `
        <img src="${game.background_image}" alt="${game.name}" loading="lazy">
      `;
    } else {
      console.error(`Game data not found for "${title}"`);
    }
  }
}

// Ensure the DOM is loaded before running displayGames
document.addEventListener('DOMContentLoaded', displayGames);

async function renderAllAlbums() {
  try {
    const response = await fetch('now-playing-content/albums.json');
    const data = await response.json();
    const container = document.getElementById('albums-container');
    if (!container) return;

    let html = '';
    for (const year of Object.keys(data)) {
      html += `<h2>${year}</h2>`;
      const months = data[year];
      for (const month of Object.keys(months)) {
        html += `<h3 style="font-family:Oldenburg;margin:0.75em;">${month.toUpperCase()} '${year.slice(-2)}</h3>`;
        html += `<div class="media-grid">`;
        for (const album of months[month]) {
          const classes = [
            album.favorite ? 'favorite' : '',
            album.ep ? 'ep' : '',
            'album'
          ].join(' ').trim();
          html += `
            <div class="${classes}">
              <a href="${album.url}" target="_blank" rel="noopener">
                <img src="${album.image}" alt="${album.title} by ${album.artist}" loading="lazy">
              </a>
            </div>
          `;
        }
        html += `</div>`;
      }
    }
    container.innerHTML = html;
  } catch (e) {
    console.error('Error loading albums:', e);
  }
}

document.addEventListener('DOMContentLoaded', renderAllAlbums);

