// Shared constants and utilities
export const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY;

// Global watchlist storage
export let watchlistItems = {};

// Load watchlist from localStorage (mutates watchlistItems in place)
export function loadWatchlist() {
  const saved = localStorage.getItem('movieWatchlist');
  if (saved) {
    const loaded = JSON.parse(saved);
    // Mutate in place instead of reassigning so importers keep valid reference
    Object.assign(watchlistItems, loaded);
  }
}

// Add movie to watchlist (used by search page)
export function addToWatchlist(button) {
  const movieId = button.getAttribute('data-id');
  const movieTitle = button.getAttribute('data-title');
  const moviePoster = button.getAttribute('data-poster');

  if (!movieId || !movieTitle) {
    console.error('Missing movie data:', { movieId, movieTitle });
    alert('Error: Could not add movie to watchlist');
    return;
  }

  if (watchlistItems[movieId]) {
    alert('Already in your watchlist!');
    return;
  }

  watchlistItems[movieId] = {
    imdbID: movieId,
    Title: movieTitle,
    Poster: moviePoster || 'N/A'
  };

  localStorage.setItem('movieWatchlist', JSON.stringify(watchlistItems));

  button.classList.add('active');
  button.textContent = '✓ In Watchlist';
  button.disabled = true;
}