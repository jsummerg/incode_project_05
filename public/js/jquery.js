// console.log("Testing")

// $("#insert-here").attr("class", "insert")
// console.log($("#insert-here").attr("class"))

// const newElement = $('div')
// $(newElement).append('Hey there')
// for (let i = 0; i < 5; i++) {
//     console.log("Fired")
//     $('#insert-here').append("<div>").text("Hey there")
// }

const api_key = 'b5e1ec0ad8957e083cf7e7b4d3605c9e'
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`
const image_url = 'https://image.tmdb.org/t/p/w500'

// dynamically add 20 most popular movie posters to #movies
$.getJSON(`${tmdb_base_url}/discover/movie${api_query}`, function(data) {
  // console.log(data.results)
  data.results.forEach(movie => {
    const posterImage = movie.poster_path
    const movieEntry = $("<div>").append(`<img src="${image_url}${posterImage}">`)
    $("#movies").append(movieEntry)
  })
});


// show the movie video (from youtube or vimeo) at class ".movie-video"   . Need to define the "movie_id"?
$.getJSON(`${tmdb_base_url}/movie/${movie_id}/videos${api_query}&language=en-US`,
  function (data) {
    let video_URL = "";
    if (data.results[0].site === "YouTube") {
      video_URL = `https://www.youtube.com/embed/${data.results[0].key}`;
    } else if (data.results[0].site === "Vimeo") {
      video_URL = `https://vimeo.com/${data.results[0].key}`;
    }
    $(".movie-video").attr("src", video_URL);
  })
  .catch((err) => {
    return res.send(err.message)
  });

