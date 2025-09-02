let moviesData = {};
let currentPage = 1; // start at page 1
// Genre mapping
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

let currentFilter = "all";


function fetchMovies(page = 1) {
  fetch(
    `https://api.themoviedb.org/4/account/68b695eb78edceaf8a3f03ab/movie/recommendations?page=${page}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGVjYmJkZTc1Y2Y0Njg4ZmUyMTIyZWFiMWEyNmQ4YiIsIm5iZiI6MTc1Njc5NjM5NS4xNjYwMDAxLCJzdWIiOiI2OGI2OTVlYjc4ZWRjZWFmOGEzZjAzYWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-y0Mh9b43EsIkVB5UwboHEcTW7lSgsCT4X9wbQRIwhY",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      moviesData = response;
      displayMovies(moviesData.results);
    })
    .catch((error) => console.error("Error fetching movies:", error));
}
// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  fetchMovies();
setupEventListeners();
});
// Example: next button
document.getElementById("other_rec").addEventListener("click", () => {
    if(currentPage<5){
          currentPage++;
    }else{
        currentPage=1; 
    }
  fetchMovies(currentPage);
});

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

function setupEventListeners() {
  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      filterAndDisplayMovies();
    });
  });
}

function filterAndDisplayMovies() {
  let filteredMovies = moviesData.results;

  // Filter by genre
  if (currentFilter !== "all") {
    const genreFilters = {
      action: 28,
      adventure: 12,
      animation: 16,
      drama: 18,
      "sci-fi": 878,
      comedy: 35,
    };

    const genreId = genreFilters[currentFilter];
    if (genreId) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
    }
  }

  displayMovies(filteredMovies);
}

function displayMovies(movies) {
  const moviesGrid = document.getElementById("moviesGrid");

  if (movies.length === 0) {
    moviesGrid.innerHTML =
      '<div class="no-results">No movies found matching your criteria.</div>';
    return;
  }

  moviesGrid.innerHTML = movies
    .map((movie) => {
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750/333/fff?text=No+Image";

      const releaseYear = movie.release_date
        ? movie.release_date.split("-")[0]
        : "Unknown";
      const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

      const genres = movie.genre_ids
        .map((id) => genreMap[id])
        .filter(Boolean)
        .slice(0, 3);
      return `
                    <div class="movie-card" data-movie-id="${movie.id}">
                        <img src="${posterUrl}" alt="${
        movie.title
      }" class="movie-poster" loading="lazy">
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-year">${releaseYear}</div>
                            <div class="genres">
                                ${genres
                                  .map(
                                    (genre) =>
                                      `<span class="genre-tag">${genre}</span>`
                                  )
                                  .join("")}
                            </div>
                            <p class="movie-overview">${movie.overview}</p>
                            <div class="movie-stats">
                                <div class="rating">
                                    ⭐ ${rating}
                                </div>
                                <div class="popularity">
                                    👥 ${Math.round(movie.popularity)}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    })
    .join("");

  // Add click handlers to movie cards
  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", function () {
      const movieId = this.dataset.movieId;
      const movie = movies.find((m) => m.id == movieId);
      showMovieDetails(movie);
    });
  });
}

function showMovieDetails(movie) {
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;

  const modalHtml = `
                <div class="modal-overlay" id="movieModal">
                    <div class="modal-content">
                        <div class="modal-backdrop" style="background-image: url('${backdrop}')"></div>
                        <div class="modal-info">
                            <button class="close-btn" onclick="closeModal()">&times;</button>
                            <h2>${movie.title}</h2>
                            <div class="modal-details">
                                <span class="release-year">${
                                  movie.release_date
                                    ? movie.release_date.split("-")[0]
                                    : "Unknown"
                                }</span>
                                <span class="rating">⭐ ${
                                  movie.vote_average
                                    ? movie.vote_average.toFixed(1)
                                    : "N/A"
                                }</span>
                                <span class="votes">${
                                  movie.vote_count
                                } votes</span>
                            </div>
                            <p class="modal-overview">${movie.overview}</p>
                            <div class="modal-genres">
                                ${movie.genre_ids
                                  .map((id) => genreMap[id])
                                  .filter(Boolean)
                                  .map(
                                    (genre) =>
                                      `<span class="genre-tag">${genre}</span>`
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Add modal styles
  const modalStyles = `
                <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content {
                    background: rgba(15, 15, 35, 0.95);
                    border-radius: 20px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90%;
                    overflow: hidden;
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    animation: slideUp 0.4s ease;
                }

                .modal-backdrop {
                    height: 300px;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    filter: brightness(0.7);
                }

                .modal-info {
                    padding: 2rem;
                    position: relative;
                }

                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: #fff;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .close-btn:hover {
                    background: rgba(255, 107, 107, 0.8);
                    transform: scale(1.1);
                }

                .modal-info h2 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .modal-details {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .modal-details span {
                    color: #4ecdc4;
                    font-weight: 500;
                }

                .modal-overview {
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    font-size: 1.1rem;
                }

                .modal-genres {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { transform: translateY(50px) scale(0.9); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                </style>
            `;

  if (!document.querySelector("#modal-styles")) {
    const styleElement = document.createElement("div");
    styleElement.id = "modal-styles";
    styleElement.innerHTML = modalStyles;
    document.head.appendChild(styleElement);
  }
}

function closeModal() {
  const modal = document.getElementById("movieModal");
  if (modal) {
    modal.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => modal.remove(), 300);
  }
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Add fadeOut animation
const fadeOutStyle = document.createElement("style");
fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
document.head.appendChild(fadeOutStyle);
