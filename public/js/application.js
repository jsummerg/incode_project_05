const api_endpoint = 'https://api.themoviedb.org/3'
const api_key = '1a36dc53a72920430421fa20480bb680'
const api_img_path = 'https://image.tmdb.org/t/p/w500/'

$(document).ready(function() {

    $('#searchBar').keyup(function() {
        searchMovies($('#searchBar').val(), $('#genreSearchFilter').val())
    })

    $('#genreSearchFilter').change(function() {
        searchMovies($('#searchBar').val(), $('#genreSearchFilter').val())
    })
    
    $("#searchIcon").click(function() {
        window.location.href = '/movies/'+$('#movieId').val()
    })

    getGenres()
})

function getGenres() {
    $.ajax({
        url: api_endpoint+'/genre/movie/list?',
        method: 'get',
        data: {api_key: api_key},
        dataType: 'json',
        success: function(genreList) {
            displayGenreList(genreList)}
    })
}

function displayGenreList(genreList) {
    genreList.genres.forEach(genre => {
        $('#genreSearchFilter').append('<option value="'+genre.id+'">'+genre.name+'</option></option>')
    })
}

function searchMovies(movieName, genreFilter) {
    if (movieName.length >= 3) {
        $('#searchResult').empty()
        $.ajax({
            url: api_endpoint+'/search/movie',
            method: 'get',
            data: { api_key: api_key,
                    page: '1',
                    query: movieName},
            dataType: 'json',
            success: function(movieList) {                        
                displaySearchResults(movieList, genreFilter)
            }        
        })
    }
    else {
        $('.search-bar').removeClass("active");
    }
}

function displaySearchResults(movieList, genreFilter) {
    if (movieList.results.length > 0){
        $('.search-bar').addClass("active");
        movieList.results.forEach(movie => {
            //console.log(movie)
            if (genreFilter == '0' || movie.genre_ids.includes(parseInt(genreFilter))) {            
                let html = '<li value="'+movie.id+'" onclick="selectMovie(this);">'
                if (movie.poster_path != null) {
                    html += '<img src="'+api_img_path+movie.poster_path+'" heigth="75" width="50" class="img-thumbnail" />'
                }
                html += movie.original_title+'&nbsp;('+isNull(movie.release_date,'?').substring(0,4)+')</li>'
                $('#searchResult').append(html)        
            }
        })    
    }    
}

function selectMovie(element) {
    //console.log($(element).text())
    $('#searchBar').val($(element).text())
    $('#movieId').val($(element).val())
    $('.search-bar').removeClass("active");
}

function isNull(strValue, strReplace) {    
    if (strValue == null || strValue == '' || strValue == undefined)
        return strReplace
    else return strValue
}

