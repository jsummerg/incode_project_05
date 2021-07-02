const image_url = 'https://image.tmdb.org/t/p/w500'

const avgMovieRating = 0
const votesSum = 0

// dynamically add 20 most popular movie posters to #movies
$.getJSON('/api/popular-movies', function(data) {
  // console.log(data.results)
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

// .append($('<div class="info">').append($(movieTitle)).append(movieRating).append(movieVotes)))

// ratings = Our rating database
// users = Our user database


// Show the MOVIE VIDEO (from youtube or vimeo) at class ".movieVideo". 
// Need to define the "movieId"?
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=b5e1ec0ad8957e083cf7e7b4d3605c9e`

// should be changed after to ${movieId} in the place of "550". This is for testing at home page.
$.getJSON(`${tmdb_base_url}/movie/550/videos${api_query}&language=en-US`, function (data) {
  let video_URL = "";
  if (data.results[0].site === "YouTube") {
    video_URL = `https://www.youtube.com/embed/${data.results[0].key}`;
  } else if (data.results[0].site === "Vimeo") {
    video_URL = `https://vimeo.com/${data.results[0].key}`;
  }
  $(".movieVideo").attr("src", video_URL);
})
.catch((err) => {
  return res.send(err.message)
});