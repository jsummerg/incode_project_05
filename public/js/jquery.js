const api_key = 'b5e1ec0ad8957e083cf7e7b4d3605c9e'
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`
const image_url = 'https://image.tmdb.org/t/p/w500'

// dynamically add 20 most popular movie posters to #movies
$.getJSON(`${tmdb_base_url}/discover/movie${api_query}`, function(data) {
  // console.log(data.results)
  data.results.forEach(movie => {
    const posterImage = movie.poster_path
    const moviePoster = `<img class="poster" src="${image_url}${posterImage}">`
    const movieTitle = `<h2 class="TitleStyle">The Name</h2>`
    const movieRating = `<p>Rating: #</p>`
    const movieVotes = `<p>Number of votes: #</p>`
    const movieCard = $("<div class='movieCard'>").append(moviePoster)
    $("#movies").append($(movieCard).append($(movieTitle)) // Creates a card with the poster img in it
    .append($('<div class="info flex space-between">').append(movieRating).append(movieVotes))) // Puts the information in a div blow the poster
  })
})

// .append($('<div class="info">').append($(movieTitle)).append(movieRating).append(movieVotes)))