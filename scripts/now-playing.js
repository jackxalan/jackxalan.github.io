// TMDB API Key
const apiKey = "4526ca5104f6770580cbb773ede26961";

// Fetch Movies by Title
async function fetchMovieByTitle(title) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0]; // Use the first result
    } else {
      console.error(`No results found for "${title}"`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

// Display Movies
async function displayMovies() {
  const movieLinks = document.querySelectorAll("#movies-container a");

  for (const link of movieLinks) {
    const title = link.id; // Use the ID of the link as the movie title
    const movie = await fetchMovieByTitle(title);

    if (movie) {
      link.href = `https://www.themoviedb.org/movie/${movie.id}`;
      link.innerHTML = `
        <img src="${
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }" alt="${movie.title}" loading="lazy">
      `;
    } else {
      console.error(`Movie data not found for "${title}"`);
    }
  }
}

// Fetch Shows by Title
async function fetchShowByTitle(title) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(title)}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      return data.results[0]; // Use the first result
    } else {
      console.error(`No results found for "${title}"`);
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
    const title = link.id; // Use the ID of the link as the show title
    const show = await fetchShowByTitle(title);

    if (show) {
      link.href = `https://www.themoviedb.org/tv/${show.id}`;
      link.innerHTML = `
        <img src="${
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }" alt="${show.name}" loading="lazy">
      `;
    } else {
      console.error(`Show data not found for "${title}"`);
    }
  }
}

// Show Section
function showSection(sectionNumber) {
  const totalSections = 5; // Update this if you add more sections

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
        image.loading = 'lazy';
        
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

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  displayMovies();
  displayShows();
  fetchPodcastData();
});