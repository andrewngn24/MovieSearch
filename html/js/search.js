// Search page specific code
import { omdbApiKey, watchlistItems, loadWatchlist, addToWatchlist } from './common.js';

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const resultsList = document.getElementById("resultsList");
const noResults = document.getElementById("noResults");
const searchError = document.getElementById("searchError");

// Debounce utility to prevent rapid API requests
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

async function searchMovie(movieName) {
  try {
    const url = `https://www.omdbapi.com/?apikey=${omdbApiKey}&s=${movieName}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

async function handleSearch() {
  const movieName = searchInput.value.trim();
  if (movieName === '') return;

  searchBtn.disabled = true;
  searchBtn.style.opacity = '0.6';

  const results = await searchMovie(movieName);
  if (results.Response === 'True') {
    displaySearch(results.Search);
  } else {
    displaySearch(null);
  }
  searchInput.value = '';

  searchBtn.disabled = false;
  searchBtn.style.opacity = '1';
}

function displaySearch(movies) {
  if (!movies || movies.length === 0) {
    searchError.style.display = 'block';
    resultsList.innerHTML = '';
    noResults.style.display = 'none';
    return;
  }

  searchError.style.display = 'none';
  noResults.style.display = 'none';

  let moviesHtml = '';
  movies.forEach(movie => {
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
  });
  resultsList.innerHTML = moviesHtml;
}

// Create debounced version of handleSearch (500ms delay)
const debouncedSearch = debounce(handleSearch, 500);

// Event listeners
searchBtn.addEventListener("click", debouncedSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') debouncedSearch();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-watchlist')) {
    e.stopPropagation();
    addToWatchlist(e.target);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadWatchlist();
});