const api_key = 'b5e1ec0ad8957e083cf7e7b4d3605c9e'
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`
const image_url = 'https://image.tmdb.org/t/p/w500'

// dynamically add 20 most popular movie posters to #movies
$.getJSON(`${tmdb_base_url}/discover/movie${api_query}`, function(data) {
  // console.log(data.results)
  data.results.forEach(movie => {
    const posterImage = movie.poster_path
    const movieEntry = $("<div class='poster'>").append(`<img src="${image_url}${posterImage}">`)
    $("#movies").append(movieEntry)
  })
})