const image_url = 'https://image.tmdb.org/t/p/w500'

const avgMovieRating = 0
const votesSum = 0

// dynamically add 20 most popular movie posters to #movies
$.getJSON('/api/popular-movies', function(data) {
  data.results.forEach(movie => {
    const posterImage = movie.poster_path
    const moviePoster = `<img class="poster" src="${image_url}${posterImage}">`
    const movieTitle = `<a href="/movies/${movie.id}" class="TitleStyle">${movie.original_title}</a>`
    const movieRating = `<p>Rating: ${avgMovieRating}</p>`
    const movieVotes = `<p>Number of votes: ${votesSum}</p>`
    const movieCard = $(`<div class='movieCard' value='${movie.id}'>`).append(moviePoster)
    $("#movies").append($(movieCard).append($(movieTitle)) // Creates a card with the poster img and title below it
    .append($('<div class="info flex space-between">').append(movieRating).append(movieVotes))) // Puts the rating score and count in a div blow the title
  })
})

// ratings = Our rating database
// users = Our user database