// Watchlist page specific code
import { watchlistItems, loadWatchlist } from './common.js';

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
      </li>`;
  });

  watchlistItemsList.innerHTML = moviesHTML;
}

function removeFromWatchlist(button) {
  const movieId = button.getAttribute('data-id');
  delete watchlistItems[movieId];
  localStorage.setItem('movieWatchlist', JSON.stringify(watchlistItems));
  displayWatchlist();
}

// Event listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-remove')) {
    e.stopPropagation();
    removeFromWatchlist(e.target);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadWatchlist();
  displayWatchlist();
});