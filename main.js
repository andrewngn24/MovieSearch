const omdbApiKey = '4a59076d';
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const resultsList = document.getElementById("resultsList");
const noResults = document.getElementById("noResults");
const searchError = document.getElementById("searchError");
const emptyWatchlist = document.getElementById("emptyWatchlist");

// Load watchlist from localStorage on page load
function loadWatchlist() {
  const saved = localStorage.getItem('movieWatchlist');
  if (saved) {
    watchlistItems = JSON.parse(saved);
  };
};

async function searchMovie(movieName) {
  try {
    const url = `https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${movieName}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  };
};

async function handleSearch() {
  const movieName = searchInput.value.trim();
  if (movieName === '') {
    return;
  };
  const results = await searchMovie(movieName);
  if (results.Response === 'True') {
    displaySearch(results.Search);
  } else {
    displaySearch(null);
  };
  searchInput.value = '';
};

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  };
});


function displaySearch(movies) { 
  if (!movies || movies.length === 0) {
    searchError.style.display = 'block';
    resultsList.innerHTML = '';
    noResults.style.display = 'none';
    return;
  };
  
  searchError.style.display = 'none';
  noResults.style.display = 'none';
  
  let moviesHtml = '';
  movies.forEach(movie => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120?text=No+Image';
    const isInWatchlist = watchlistItems[movie.imdbID];
    moviesHtml += `
      <li class="movie-item">
        <div class="movie-poster">
          <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
        <div class="movie-content">
          <div class="movie-header">
            <h3 class="movie-title">${movie.Title}</h3>
          </div>
          <div class="movie-meta">
            <span class="movie-rating">${movie.Year}</span>
            <span class="movie-meta-item">${movie.Type}</span>
          </div>
          <div class="movie-actions">
            <button class="movie-btn btn-watchlist" data-id="${movie.imdbID}" data-title="${movie.Title}" data-poster="${movie.Poster}" ${isInWatchlist ? 'disabled' : ''}>
              ${isInWatchlist ? '✓ In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </li>`;
  });c
  resultsList.innerHTML = moviesHtml;
};

let watchlistItems = {}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-watchlist')) {
    e.stopPropagation();
    addToWatchlist(e.target);
  }
  if (e.target.classList.contains('btn-remove')) {
    e.stopPropagation();
    removeFromWatchlist(e.target);
  }
});

// Add movie to watchlist
function addToWatchlist(button) {
  const movieId = button.getAttribute('data-id');
  const movieTitle = button.getAttribute('data-title');
  const moviePoster = button.getAttribute('data-poster');
  
  if (!movieId || !movieTitle) {
    console.error('Missing movie data:', { movieId, movieTitle });
    alert('Error: Could not add movie to watchlist');
    return;
  }
  
  // Check if already in watchlist
  if (watchlistItems[movieId]) {
    alert('Already in your watchlist!');
    return;
  }
  
  // Add to watchlist object
  watchlistItems[movieId] = {
    imdbID: movieId,
    Title: movieTitle,
    Poster: moviePoster || 'N/A'
  };
  
  // Save to localStorage
  localStorage.setItem('movieWatchlist', JSON.stringify(watchlistItems));
  
  // Update button appearance
  button.classList.add('active');
  button.textContent = '✓ In Watchlist';
  button.disabled = true;
}

// Display watchlist
function displayWatchlist() {
  const watchlistItemsList = document.querySelector('#watchlistItems');
  const emptyWatchlist = document.querySelector('#emptyWatchlist');
  
  if (!watchlistItemsList) return;
  
  const movies = Object.values(watchlistItems);
  
  if (movies.length === 0) {
    emptyWatchlist.style.display = 'block';
    watchlistItemsList.innerHTML = '';
    return;
  }
  
  emptyWatchlist.style.display = 'none';
  
  let moviesHTML = '';
  
  movies.forEach(movie => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image';
    
    moviesHTML += `
      <li class="movie-item">
        <div class="movie-poster">
          <img src="${posterUrl}" alt="${movie.Title}">
        </div>
        <div class="movie-content">
          <div class="movie-header">
            <h2 class="movie-title">${movie.Title}</h2>
          </div>
          <p class="movie-description">Added to your watchlist</p>
          <div class="movie-actions">
            <button class="movie-btn btn-remove" data-id="${movie.imdbID}">
              Remove from Watchlist
            </button>
          </div>
        </div>
      </li>
    `;
  });
  
  watchlistItemsList.innerHTML = moviesHTML;
}
 
// Remove movie from watchlist
function removeFromWatchlist(button) {
  const movieId = button.getAttribute('data-id');
  
  delete watchlistItems[movieId];
  localStorage.setItem('movieWatchlist', JSON.stringify(watchlistItems));
  
  // Update search page button if it exists
  const searchBtn = resultsList.querySelector(`[data-id="${movieId}"]`);
  if (searchBtn) {
    searchBtn.disabled = false;
    searchBtn.classList.remove('active');
    searchBtn.textContent = 'Add to Watchlist';
  }
  
  displayWatchlist();
}
 
// Page navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Get the page to show
      const href = link.getAttribute('href');
      if (href === 'search.html' || href === '#search') {
        // Show search page
        const searchPage = document.querySelector('.search-section');
        const watchlistPage = document.querySelector('.watchlist-section');
        if (searchPage) searchPage.parentElement.style.display = 'block';
        if (watchlistPage) watchlistPage.parentElement.style.display = 'none';
      } else if (href === 'watchlist.html' || href === '#watchlist') {
        // Show watchlist page
        const searchPage = document.querySelector('.search-section');
        const watchlistPage = document.querySelector('.watchlist-section');
        if (searchPage) searchPage.parentElement.style.display = 'none';
        if (watchlistPage) watchlistPage.parentElement.style.display = 'block';
        displayWatchlist();
      }
    });
  });
}
 
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadWatchlist();
  setupNavigation();
  
  // If on watchlist page, display watchlist
  const watchlistSection = document.querySelector('.watchlist-section');
  if (watchlistSection) {
    displayWatchlist();
  }
  
  // If on search page, check watchlist status for any existing results
  const searchSection = document.querySelector('.search-section');
  if (searchSection && resultsList.innerHTML) {
    const buttons = resultsList.querySelectorAll('.btn-watchlist');
    buttons.forEach(btn => {
      const movieId = btn.getAttribute('data-id');
      if (watchlistItems[movieId]) {
        btn.disabled = true;
        btn.textContent = '✓ In Watchlist';
        btn.classList.add('active');
      }
    });
  }
});