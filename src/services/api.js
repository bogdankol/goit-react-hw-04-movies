import axios from 'axios';

const API_KEY = "6fe4e075ea6e2255d0223a798df99bd5"

async function fetchTrending() {
    return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
}

async function fetchByQuery(query) {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);
}

function fetchById(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
}

function fetchCast(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
}

function fetchReviews(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`);
}


export {fetchTrending, fetchByQuery, fetchById, fetchCast, fetchReviews}