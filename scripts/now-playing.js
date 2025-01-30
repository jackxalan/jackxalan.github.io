document.addEventListener("DOMContentLoaded", () => {
  displayMovies();
  displayShows();
});

// Section Switching Functions
function showSection1() {
  document.getElementById("section2-button").className = "buttonoff";
  document.getElementById("section1-button").className = "selectedbutton";
  document.getElementById("section3-button").className = "buttonoff";
  document.getElementById("section4-button").className = "buttonoff";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "none";
  document.getElementById("section1").style.display = "block";
  document.getElementById("section4").style.display = "none";
}

function showSection2() {
  document.getElementById("section2-button").className = "selectedbutton";
  document.getElementById("section1-button").className = "buttonoff";
  document.getElementById("section3-button").className = "buttonoff";
  document.getElementById("section4-button").className = "buttonoff";
  document.getElementById("section1").style.display = "none";
  document.getElementById("section3").style.display = "none";
  document.getElementById("section2").style.display = "block";
  document.getElementById("section4").style.display = "none";
}

function showSection3() {
  document.getElementById("section2-button").className = "buttonoff";
  document.getElementById("section1-button").className = "buttonoff";
  document.getElementById("section3-button").className = "selectedbutton";
  document.getElementById("section4-button").className = "buttonoff";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section1").style.display = "none";
  document.getElementById("section3").style.display = "block";
  document.getElementById("section4").style.display = "none";
}

function showSection4() {
  document.getElementById("section2-button").className = "buttonoff";
  document.getElementById("section1-button").className = "buttonoff";
  document.getElementById("section3-button").className = "buttonoff";
  document.getElementById("section4-button").className = "selectedbutton";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section1").style.display = "none";
  document.getElementById("section3").style.display = "none";
  document.getElementById("section4").style.display = "block";
}

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
