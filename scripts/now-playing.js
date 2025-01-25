function showMusic() {
	document.getElementById('movies-button').className = 'buttonoff';
    document.getElementById('music-button').className = 'selectedbutton';
    document.getElementById('books-button').className = 'buttonoff';
	document.getElementById('movies-section').style.display = 'none';
   	document.getElementById('books-section').style.display = 'none';
	document.getElementById('music-section').style.display = 'block';
	
  }

  function showMovies() {
	document.getElementById('movies-button').className = 'selectedbutton';
    document.getElementById('music-button').className = 'buttonoff';
    document.getElementById('books-button').className = 'buttonoff';
    document.getElementById('music-section').style.display = 'none';
    document.getElementById('books-section').style.display = 'none';
	document.getElementById('movies-section').style.display = 'block';

  }
   function showBooks() {
	document.getElementById('movies-button').className = 'buttonoff';
    document.getElementById('music-button').className = 'buttonoff';
    document.getElementById('books-button').className = 'selectedbutton';
	document.getElementById('movies-section').style.display = 'none';
    document.getElementById('music-section').style.display = 'none';
    document.getElementById('books-section').style.display = 'block';
  }
  
  const apiKey = '4526ca5104f6770580cbb773ede26961'; // Your TMDB API key

    // Function to open the iframe popup
    function openPopup(event, link) {
      event.preventDefault(); // Prevent the default link behavior
      const popupContainer = document.getElementById('popupContainer');
      const popupIframe = document.getElementById('popupIframe');

      // Set the source of the iframe to the TMDB movie page
      popupIframe.src = link;
      popupContainer.style.display = 'flex';
    }

    // Function to close the iframe pop-up
    function closePopup() {
      const popupContainer = document.getElementById('popupContainer');
      const popupIframe = document.getElementById('popupIframe');

      popupContainer.style.display = 'none';
      popupIframe.src = 'about:blank'; // Clear the iframe source
    }

    async function fetchMovieByTitle(title) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`);
        const data = await response.json();

        if (data.results.length > 0) {
          return data.results[0]; // Use the first result
        } else {
          console.error(`No results found for "${title}"`);
          return null;
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    }

    async function displayMovies() {
      const movieLinks = document.querySelectorAll('#movies-container a');

      for (const link of movieLinks) {
        const title = link.id; // Use the ID of the link as the movie title
        const movie = await fetchMovieByTitle(title);

        if (movie) {
          const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`;
          link.href = tmdbLink;
          link.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          `;
          // Attach the openPopup function to each link
          link.addEventListener('click', (event) => openPopup(event, tmdbLink));
        } else {
          console.error(`Movie data not found for "${title}"`);
        }
      }
    }

    displayMovies();
	
const apiKey = '4526ca5104f6770580cbb773ede26961'; // Your TMDB API key

    async function fetchSingleMovieByTitle(title) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`);
        const data = await response.json();

        if (data.results.length > 0) {
          return data.results[0]; // Use the first result
        } else {
          console.error(`No results found for "${title}"`);
          return null;
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    }

    async function displayMovie() {
      const movieLinks = document.querySelectorAll('#review-container a');

      for (const link of movieLinks) {
        const title = link.id; // Use the ID of the link as the movie title
        const movie = await fetchSingleMovieByTitle(title);

        if (movie) {
          link.href = `https://www.themoviedb.org/movie/${movie.id}`;
          link.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          `;
        } else {
          console.error(`Movie data not found for "${title}"`);
        }
      }
    }

    displayMovie();
	
    // Function to fetch book cover URL from Open Library
    async function fetchOpenLibraryCover(bookId) {
      const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(bookId)}`;
      const response = await fetch(searchUrl);
      const data = await response.json();

      // Check if there are results and extract the first ISBN
      const isbn = data.docs?.[0]?.isbn?.[0];
      if (!isbn) {
        console.error(`No ISBN found for book: ${bookId}`);
        return `https://via.placeholder.com/128?text=No+Cover`;
      }

      // Construct the cover URL using the ISBN
      return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    }

    // Function to populate existing links with cover images
    async function populateBookLinks() {
      const links = document.querySelectorAll(".book");

      for (const link of links) {
        const bookId = link.id.replace(/-/g, " "); // Convert ID back to book name
        const coverUrl = await fetchOpenLibraryCover(bookId);

        // Set the href and append the image
        link.href = `https://openlibrary.org/search?q=${encodeURIComponent(bookId)}`;
        link.target = "_blank";

        const img = document.createElement("img");
        img.src = coverUrl;
        img.alt = bookId;
        link.appendChild(img);
      }
    }

    // Populate links on page load
    document.addEventListener("DOMContentLoaded", populateBookLinks);
