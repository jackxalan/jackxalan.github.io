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
          link.href = `https://www.themoviedb.org/movie/${movie.id}`;
          link.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          `;
        } else {
          console.error(`Movie data not found for "${title}"`);
        }
      }
    }

    displayMovies();
