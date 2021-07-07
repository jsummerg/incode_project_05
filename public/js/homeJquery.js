const image_url = "https://image.tmdb.org/t/p/w500";
const tmdb_base_url = "https://api.themoviedb.org/3";
const api_query = `?api_key=b5e1ec0ad8957e083cf7e7b4d3605c9e`;

const avgMovieRating = 0;
const votesSum = 0;

$(document).ready(function () {
  getPopularMovies();
  getTrailer();
  $('#genreHomeFilter').change(function() {
    getPopularMovies()
  })
});

// dynamically add 20 most popular movie posters to #movies
function getPopularMovies() {
  let genreFilter = $('#genreHomeFilter').val()
  let movieCounter = 0
  $("#movies").empty()
  $.getJSON("/api/popular-movies", function (data) {
    data.results.forEach((movie) => {
      if (genreFilter == '0' || movie.genre_ids.includes(parseInt(genreFilter))) {
        movieCounter++
        const posterImage = movie.poster_path;
        const moviePoster = `<img class="poster" src="${image_url}${posterImage}">`;
        const movieTitle = `<a href="/movies/${movie.id}" class="TitleStyle">${movie.original_title}</a>`;
        const movieRating = `<p>Rating: ${avgMovieRating}</p>`;
        const movieVotes = `<p>Number of votes: ${votesSum}</p>`;
        const movieCard = $(`<div class='movieCard' value='${movie.id}'>`).append(
          moviePoster
        );
        $("#movies").append(
          $(movieCard)
            .append($(movieTitle)) // Creates a card with the poster img and title below it
            .append(
              $('<div class="info flex space-between">')
                .append(movieRating)
                .append(movieVotes)
            )
        ); // Puts the rating score and count in a div blow the title
      }
    });
    if (movieCounter == 0) {
      $("#movies").append('<h3>Sorry, there are no '+$('#genreHomeFilter option:selected').text()+' movies on the list of the 20 most popular movies.</h3>')
    }
  });
}

// .append($('<div class="info">').append($(movieTitle)).append(movieRating).append(movieVotes)))

// ratings = Our rating database
// users = Our user database

// Show the MOVIE VIDEO (from youtube or vimeo) at class ".movieVideo".
function getTrailer() {
  let movieId = window.location.href.replace(
    "http://localhost:3000/movies/",
    ""
  ); // Find the movie_id at href

  $.getJSON(
    `${tmdb_base_url}/movie/${movieId}/videos${api_query}&language=en-US`,
    function (data) {
      let video_URL = "";
      const i = Math.floor(Math.random() * 20)
      if (data.results[i]?.site == undefined) {
        //If there's no videos in the results, it will load this instead of giving a error (example: http://localhost:3000/movies/385687).
        video_URL = `https://www.comingsoon.net/assets/uploads/2019/02/trailer1.jpg`;
      } else if (data.results[i]?.site === "YouTube") {
        video_URL = `https://www.youtube.com/embed/${data.results[i].key}`;
      } else if (data.results[i]?.site === "Vimeo") {
        video_URL = `https://vimeo.com/${data.results[i].key}`;
      }
      $(".movieVideo").attr("src", video_URL);
    }
  ).catch((err) => {
    return res.send(err.message);
  });
}
