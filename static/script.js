// Movie Database Application
let allMovies = [];
let currentMovies = [];
let selectedGenre = '';

// Sample movie data with genres
const sampleMovies = [
    { id: 1, title: "The Matrix", genre: "Action", year: 1999, director: "Wachowski Sisters", rating: "8.7" },
    { id: 2, title: "Inception", genre: "Action", year: 2010, director: "Christopher Nolan", rating: "8.8" },
    { id: 3, title: "Pulp Fiction", genre: "Action", year: 1994, director: "Quentin Tarantino", rating: "8.9" },
    { id: 4, title: "The Godfather", genre: "Drama", year: 1972, director: "Francis Ford Coppola", rating: "9.2" },
    { id: 5, title: "Schindler's List", genre: "Drama", year: 1993, director: "Steven Spielberg", rating: "8.9" },
    { id: 6, title: "Forrest Gump", genre: "Drama", year: 1994, director: "Robert Zemeckis", rating: "8.8" },
    { id: 7, title: "The Shawshank Redemption", genre: "Drama", year: 1994, director: "Frank Darabont", rating: "9.3" },
    { id: 8, title: "Monty Python and the Holy Grail", genre: "Comedy", year: 1975, director: "Terry Gilliam", rating: "8.2" },
    { id: 9, title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, director: "Wes Anderson", rating: "8.1" },
    { id: 10, title: "Groundhog Day", genre: "Comedy", year: 1993, director: "Harold Ramis", rating: "8.0" },
    { id: 11, title: "Alien", genre: "Sci-Fi", year: 1979, director: "Ridley Scott", rating: "8.4" },
    { id: 12, title: "Blade Runner", genre: "Sci-Fi", year: 1982, director: "Ridley Scott", rating: "8.1" },
    { id: 13, title: "2001: A Space Odyssey", genre: "Sci-Fi", year: 1968, director: "Stanley Kubrick", rating: "8.3" },
    { id: 14, title: "The Exorcist", genre: "Horror", year: 1973, director: "William Friedkin", rating: "8.0" },
    { id: 15, title: "Halloween", genre: "Horror", year: 1978, director: "John Carpenter", rating: "7.7" },
    { id: 16, title: "Psycho", genre: "Horror", year: 1960, director: "Alfred Hitchcock", rating: "8.5" }
];

// Available genres
const genres = ["Action", "Drama", "Comedy", "Sci-Fi", "Horror"];

// Initialize the application
function initializeApp() {
    allMovies = [...sampleMovies];
    console.log("Movie database initialized with", allMovies.length, "movies");
}

// Main function: show_filme_filter - Opens genre selection directly
function show_filme_filter() {
    console.log("show_filme_filter called - opening genre selection");
    openGenreModal();
}

// Open genre selection modal
function openGenreModal() {
    const modal = document.getElementById('genreModal');
    const genreList = document.getElementById('genreList');
    
    // Clear previous genre buttons
    genreList.innerHTML = '';
    
    // Create genre buttons
    genres.forEach(genre => {
        const button = document.createElement('button');
        button.textContent = genre;
        button.onclick = () => selectGenre(genre);
        genreList.appendChild(button);
    });
    
    modal.style.display = 'block';
}

// Close genre modal
function closeGenreModal() {
    document.getElementById('genreModal').style.display = 'none';
}

// Select genre and show movies immediately (no year selection needed)
function selectGenre(genre) {
    console.log("Genre selected:", genre);
    selectedGenre = genre;
    closeGenreModal();
    show_filme(genre);
}

// Main function: show_filme - Shows movies of selected genre immediately
function show_filme(genre) {
    console.log("show_filme called for genre:", genre);
    
    // Filter movies by genre
    currentMovies = allMovies.filter(movie => movie.genre === genre);
    
    // Show movie section
    document.getElementById('movieSection').style.display = 'block';
    
    // Update subtitle
    document.getElementById('subtitle').textContent = `Movies in genre: ${genre} (${currentMovies.length} found)`;
    
    // Display the movies
    displayMovies(currentMovies);
}

// Display movies in the table
function displayMovies(movies) {
    const tableBody = document.getElementById('movieTableBody');
    tableBody.innerHTML = '';
    
    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.year}</td>
            <td>${movie.director}</td>
            <td>${movie.rating}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Show all movies
function showAllMovies() {
    currentMovies = [...allMovies];
    document.getElementById('movieSection').style.display = 'block';
    document.getElementById('subtitle').textContent = `All movies (${allMovies.length} total)`;
    displayMovies(currentMovies);
    selectedGenre = '';
}

// Filter movies based on search inputs
function filterMovies() {
    const titleFilter = document.getElementById('searchTitle').value.toLowerCase();
    const genreFilter = document.getElementById('searchGenre').value.toLowerCase();
    const yearFilter = document.getElementById('searchYear').value.toLowerCase();
    const directorFilter = document.getElementById('searchDirector').value.toLowerCase();
    const ratingFilter = document.getElementById('searchRating').value.toLowerCase();
    
    const filteredMovies = currentMovies.filter(movie => {
        return movie.title.toLowerCase().includes(titleFilter) &&
               movie.genre.toLowerCase().includes(genreFilter) &&
               movie.year.toString().includes(yearFilter) &&
               movie.director.toLowerCase().includes(directorFilter) &&
               movie.rating.toString().includes(ratingFilter);
    });
    
    displayMovies(filteredMovies);
}

// Clear movie data and reset view
function clearMovieData() {
    currentMovies = [];
    document.getElementById('movieSection').style.display = 'none';
    document.getElementById('subtitle').textContent = 'Select movies by genre';
    selectedGenre = '';
    
    // Clear search inputs
    document.getElementById('searchTitle').value = '';
    document.getElementById('searchGenre').value = '';
    document.getElementById('searchYear').value = '';
    document.getElementById('searchDirector').value = '';
    document.getElementById('searchRating').value = '';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('genreModal');
    if (event.target == modal) {
        closeGenreModal();
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});
