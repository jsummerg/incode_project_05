const image_url = "https://image.tmdb.org/t/p/w500";

$(document).ready(function () {
  getPopularMovies();
  //getTrailer();
  $('#genreHomeFilter').change(function() {
    getPopularMovies()
  })
});

// dynamically add 20 most popular movie posters to #movies
function getPopularMovies() {
    let genreFilter = '0'//$('#genreHomeFilter').val()
    let movieCounter = 0
    $("#movies").empty()
    $.getJSON("/api/popular-movies", function (data) {
      $.getJSON(`/api/movie-ratings`, function (consoling) { 
        console.log(consoling)
      })
      data.results.forEach((movie) => {        
        if (genreFilter == '0' || movie.genre_ids.includes(parseInt(genreFilter))) {
          movieCounter++          
          $.getJSON(`/api/movie-ratings/${movie.id}`, function (ratingDatabase) {
            let avgMovieRating = 'None'
            let votesSum = 0
            if (ratingDatabase.length > 0) {
              let arr = []
              ratingDatabase.forEach((ratingData) => {
                arr.push(ratingData.rating)
              })
              avgMovieRating = ((arr.reduce((a, b) => a + b, 0))/arr.length)
              votesSum = arr.length
            }
            
            const posterImage = movie.poster_path;
            const moviePoster = `<img class="poster" src="${image_url}${posterImage}">`;
            const movieTitle = `<a href="/movies/${movie.id}" class="TitleStyle">${movie.original_title}</a>`;
            const movieRating = `<p>Rating: <strong>${avgMovieRating}</strong></p>`;
            const movieVotes = `<p>Votes: <strong>${votesSum}</strong></p>`;
            const movieCard = $(`<div class='movieCard' value='${movie.id}'>`).append(moviePoster);

            $("#movies").append(
              $(movieCard)
                .append($(movieTitle)) // Creates a card with the poster img and title below it
                .append(
                  $('<div class="info flex space-between">')
                    .append(movieRating)
                    .append(movieVotes)
                )
            ); // Puts the rating score and count in a div blow the title
          })

          

        }
      });
      if (movieCounter == 0) {
        $("#movies").append('<h3>Sorry, there are no '+$('#genreHomeFilter option:selected').text()+' movies on the list of the 20 most popular movies.</h3>')
      }
    });
}

// ratings = Our rating database
// users = Our user database

// Show the MOVIE VIDEO (from youtube or vimeo) at class ".movieVideo".
function getTrailer() {
  let movieId = window.location.href.replace(
    "http://localhost:3000/movies/",
    ""
  ); // Find the movie_id at href
  $.getJSON(`/api/videos/${movieId}`,
    function (data) {
      let video_URL = "";
      const i = Math.floor(Math.random() * 20)
      if (data.results[0]?.site == undefined) {
        //If there's no videos in the results, it will load this instead of giving a error (example: http://localhost:3000/movies/385687).
        video_URL = `https://www.comingsoon.net/assets/uploads/2019/02/trailer1.jpg`;
      } else if (data.results[0]?.site === "YouTube") {
        video_URL = `https://www.youtube.com/embed/${data.results[0].key}`;
      } else if (data.results[0]?.site === "Vimeo") {
        video_URL = `https://vimeo.com/${data.results[0].key}`;
      }
      $(".movieVideo").attr("src", video_URL);
    }
  )
}
