// $('.search-button').on('click', function() {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=ec9fa367&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             let cards = '';
//             movies.forEach(movie => {
//                 cards += showCards(movie);
//             });
//             $('.movie-container').html(cards);
    
//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=ec9fa367&i=' + $(this).data('imdbid'),
//                     success: movie => {
//                         const movieDetail = showMovieDetail(movie);
//                         $('.modal-body').html(movieDetail)
//                     },
//                     error: e => {
//                         console.log(e.reponseText);
//                     }
//                 });
//             });
//         },
//         error: e => {
//             // jika error
//             console.log(e.reponseText);
//         }
//     });
// });

// fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function(){
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=ec9fa367&s=' + inputKeyword.value)
//     .then(response => response.json())
//     .then(response => {
//         const movies = response.Search;
//         let cards = '';

//         movies.forEach(movie => cards += showCards(movie));
//         const movieContainer = document.querySelector('.movie-container');
//         movieContainer.innerHTML = cards;
        
//         // ketika tombol detail di-klik
//         const modalDetailButton = document.querySelectorAll('.modal-detail-button');

//         modalDetailButton.forEach(btn => {
//             btn.addEventListener('click', function() {
//                 const imdbid = this.dataset.imdbid;
//                 fetch('http://www.omdbapi.com/?apikey=ec9fa367&i=' + imdbid)
//                 .then(response => response.json())
//                 .then(movie => {
//                     const movieDetail = showMovieDetail(movie);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML = movieDetail;
//                 });
//             });
//         });
//     });
// });

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
    } catch (e) {   
        console.log(e);
    }
});

function updateUI(movies){
    let cards = '';
    movies.forEach(movie => cards += showCards(movie));
    document.querySelector('.movie-container').innerHTML = cards;
};

function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=ec9fa367&s=' + keyword)
    .then(response => {
        if (!response.ok){
            throw new Error (response.statusText);
        }
        return response.json();
    })
    .then(response => {
        if (response.Response === 'False'){
            throw new Error (response.Error);
        }
        return response.Search;
    });
};
// event binding
document.addEventListener('click', async function(e) {
    if (e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;  
        const movieDetail = await getMovieDetal(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetal(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=ec9fa367&i=' + imdbid)
    .then (response => response.json())
    .then(m => m)
};
function updateUIDetail(movie){
    const movieDetail = showMovieDetail(movie);
    document.querySelector('.modal-body').innerHTML = movieDetail;
};


function showCards(movie){
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show details</a>
                    </div>
                </div>
            </div>`;
};
function showMovieDetail(movie){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${movie.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Penulis :</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${movie.Plot}</li>
                        </ul>
                        </div>
                    </div>
            </div>`
};