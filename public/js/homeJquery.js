const image_url = 'https://image.tmdb.org/t/p/w500'
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=b5e1ec0ad8957e083cf7e7b4d3605c9e`

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
let movieId = window.location.href.replace('http://localhost:3000/movies/','') // Find the movie_id at href

$.getJSON(`${tmdb_base_url}/movie/${movieId}/videos${api_query}&language=en-US`, function (data) {
let video_URL = "";
  if (data.results[0]?.site == undefined) { //If there's no videos in the results, it will load this instead of giving a error (example: http://localhost:3000/movies/385687).
    video_URL = `https://www.comingsoon.net/assets/uploads/2019/02/trailer1.jpg`; 
  } else if (data.results[0]?.site === "YouTube") {
    video_URL = `https://www.youtube.com/embed/${data.results[0].key}`;
  } else if (data.results[0]?.site === "Vimeo") {
    video_URL = `https://vimeo.com/${data.results[0].key}`;
  }
  $(".movieVideo").attr("src", video_URL);
})
.catch((err) => {
  return res.send(err.message)
});