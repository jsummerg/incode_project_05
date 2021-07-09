const image_url = "https://image.tmdb.org/t/p/w500";
var genreFilter = []
var randomMovieId = 0
var randomMovieInfo = ''
var randomMovieRating = 'None'

$(document).ready(function () {
  
  getPopularMovies();  
  getMovieInfo();
  getMovieCast();
  GetRatings();

  $('#genreCheckAll').change(function() {    
    let allGenres = $(`input:checkbox[name="genreCheckAll"]`)  
    
    // if ALL is checked, we need to uncheck all the individual genres
    if (allGenres.prop('checked') == true) {   
      $(`input:checkbox[name="genreCheck"]:checked`).each(function() {      
        $(this).prop('checked', false)
      })
    }
  })

  $('#genreHomeFilter').change(function() {
    // if an individual genre has been checked, we need to uncheck ALL
    if ($(`input:checkbox[name="genreCheck"]:checked`).length > 0)
       $(`input:checkbox[name="genreCheckAll"]`).prop('checked', false)
    else $(`input:checkbox[name="genreCheckAll"]`).prop('checked', true)

    genreFilter = []

    // if ALL is not checked, we need to build a list of the checked individual genres
    if ($(`input:checkbox[name="genreCheckAll"]`).prop('checked') == false) {
      let checkboxes = $(`input:checkbox[name="genreCheck"]:checked`)
      for (let i=0; i<checkboxes.length; i++) {
          genreFilter.push(checkboxes[i].value)
      }
    }
    getPopularMovies()
    GetRatings()
   })
 })

function GetRatings() {
  let genreList = ''
  if (genreFilter.length > 0) genreList = '/'+genreFilter.join()
  $.getJSON(`/api/popular-movies${genreList}`, function (data) {
    data.results.forEach((movie) => {                      
      $.getJSON(`/api/movie-ratings/${movie.id}`, function (ratingDatabase) {
        // Rating stuff
        let avgMovieRating = 'None'
        let votesSum = 0
        if (ratingDatabase.length > 0) {
          let arr = []
          ratingDatabase.forEach((ratingData) => {
            arr.push(ratingData.rating)
          })
          avgMovieRating = Math.round((arr.reduce((a, b) => a + b, 0))/arr.length)
          votesSum = arr.length
          Math.round()
        }
        const movieRating = `<p class='ratingSlot'>Rating: <strong>${avgMovieRating}</strong></p>`;
        const movieVotes = `<p class='votesSlot'>Votes: <strong>${votesSum}</strong></p>`;

        $(`div[value="${movie.id}"] .votesSlot`).replaceWith(movieVotes)
        $(`div[value="${movie.id}"] .ratingSlot`).replaceWith(movieRating)
        
        // Random trailer picker
          if (randomMovieId == movie.id) {
            randomMovieInfo = `<h2>${movie.original_title} (`+isNull(movie.release_date,'?').substring(0,4)+`)</h2>`
            randomMovieInfo += `<p>Rating: ${avgMovieRating}</p>`
            randomMovieInfo += `<p>${movie.overview}</p>`
            getTrailer();
          }
      })
    })
  })
}

// dynamically add 20 most popular movie posters to #movies
function getPopularMovies() {    
    let movieCounter = 0
    let genreList = ''
    if (genreFilter.length > 0) genreList = '/'+genreFilter.join()
    
    $("#movies").empty()
    $.getJSON(`/api/popular-movies${genreList}`, function (data) {
      // selects a random movie from the return list to display on the trailer
      if (data.results.length > 0) {
        const i = Math.floor(Math.random() * data.results.length)-1
        randomMovieId = data.results[i].id
      }
      
      data.results.forEach((movie) => {                
          movieCounter++


          // Movie card variables
          const posterImage = movie.poster_path;
          const moviePoster = `<img class="poster" src="${image_url}${posterImage}">`;
          const movieTitle = `<a href="/movies/${movie.id}" class="TitleStyle">${movie.original_title}</a>`;
          const movieRating = `<p class='ratingSlot'>Rating: 'None'</p>`;
          const movieVotes = `<p class='votesSlot'>Votes: 0</p>`;
          const movieCard = $(`<div class='movieCard' value='${movie.id}'>`).append(moviePoster);

          // Append movie card
          $("#movies").append(
            $(movieCard)
              .append($(movieTitle)) // Creates a card with the poster img and title below it
              .append(
                $('<div class="info flex space-between">')
                  .append(movieRating)
                  .append(movieVotes)
              )
          ); // Puts the rating score and count in a div blow the title
      });

      // if 
      if (movieCounter == 0) {
        $("#movies").append('<h3>Sorry, there are no movies that match your selection.</h3>')
      }
    });
    
}

// ratings = Our rating database
// users = Our user database

// Show the MOVIE VIDEO (from youtube or vimeo) at class ".movieVideo".
function getTrailer() {
  let movieId = randomMovieId

  // if the call is coming from the details page, find the movie_id at href
  if (window.location.href.includes('/movies/'))   
    movieId = window.location.href.replace("http://localhost:3000/movies/",""); 
 
  $.getJSON(`/api/videos/${movieId}`,
    function (data) {
      let video_URL = "";      
      if (data.results[0]?.site == undefined) {
        //If there's no videos in the results, it will load this instead of giving a error (example: http://localhost:3000/movies/385687).
        video_URL = `https://www.comingsoon.net/assets/uploads/2019/02/trailer1.jpg`;
      } else {
        if (data.results[0]?.site === "YouTube") {
          video_URL = `https://www.youtube.com/embed/${data.results[0].key}`;
        } else if (data.results[0]?.site === "Vimeo") {
          video_URL = `https://vimeo.com/${data.results[0].key}`;
        }
        
    }
      $(".movieVideo").attr("src", video_URL);
      $('#homeMovieDetails').empty()
      $('#homeMovieDetails').append(randomMovieInfo)
    }
  )
}


// Show the MOVIE INFORMATION (Name, Sypnosis, etc) 
function getMovieInfo() {
  let movieId = window.location.href.replace(
    "http://localhost:3000/movies/",
    ""
  ); // Find the movie_id at href
  $.getJSON(`/api/movieInfo/${movieId}`,
    function (data) {
      let movieName = data.original_title;
      let movieYear = data.release_date.substring(0,4)
      let movieRating = data.vote_average;
      let movieSynopsis = data.overview;
      $("#movieName").append(movieName+"("+ movieYear+")") ;
      $("#movieRating").append(movieRating) ;
      $("#movieSynopsis").append(movieSynopsis) ;
    }
  )
}

// Show the MOVIE CAST (actor, directors, etc) 
function getMovieCast() {
  let movieId = window.location.href.replace(
    "http://localhost:3000/movies/",
    ""
  ); // Find the movie_id at href

  $.getJSON(`/api/castApi/${movieId}`, 
    function (data) {

            // Just showing the first name for now. I will try get the first 5 actors names here
            let movieCast = data.cast[0].name
            //console.log (movieCast)
    
          $("#movieCast").append(movieCast) ;

      // Trying to get the director name here. Not working yet!
      // if (data.crew.length > 0) {
      // let director = ""
      // //   data.crew.job.forEach((Director) => {
      // //     director.push(data.crew.name)
      // //   })
      
      //   // for (let i=0; i<data.crew.length; i++) {
      //   //   if data.crew[i].job == "Director" {
      //   //   director.push(data.crew[i].name)
      //   //   }
      //   // }

      // console.log (director)
      // $("#director").append(director) ;

    }
  )
}


// For similar movies (maybe above the details page) should reffer using  /movie/{movie_id}/similar