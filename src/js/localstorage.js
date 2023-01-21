import { refs } from './refs';
import { getYearFromDate, loadArrayMoviesByArrayOfIds } from './api';
import { addClickListenerToMovie } from './clickToMovie';
import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  LANGUAGE,
} from './api-vars';

import noImg from '../images/no-image.jpg';
import { startLoading, stopLoading } from './loader';

function loadArrayFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function deleteMovieFromLocalStorage(movieId, key) {
  try {
    const Movies = JSON.parse(localStorage.getItem(key));
    const updatedMovies = Movies.filter(id => id !== movieId);
    localStorage.setItem(key, JSON.stringify(updatedMovies));
  } catch (error) {}
}

function addMovieToWatchedList(id) {
  saveIdMovieToLocalStorage(id, 'watched', 'queue');
}

async function showMoviesFromLocalstorage(keyOfStorage) {
  const queueArray = loadArrayFromLocalStorage(keyOfStorage);
  if (queueArray.length > 0) {
    let movies = await loadArrayMoviesByArrayOfIds(queueArray);
    renderMoviesFromLocalstorageArray(movies);
    refs.libraryNotification.classList.toggle('is-hidden', true);
  } else {
    refs.movieContainer.innerHTML = '';
    refs.libraryNotification.classList.toggle('is-hidden', false);
  }
}

function addMovieToQueueList(id) {
  saveIdMovieToLocalStorage(id, 'queue', 'watched');
}

function saveIdMovieToLocalStorage(idMovie, key, keyToFindDuplicate) {
  let args = loadFromLocalStorage(key);
  let duplicateKey = loadFromLocalStorage(keyToFindDuplicate);
  let arr = [];
  if (!args) {
    arr.push(idMovie);
  } else {
    arr.push(...args);
    if (!arr.includes(idMovie)) {
      arr.push(idMovie);
    }
  }
  saveToLocalStorage(key, arr);

  if (duplicateKey) {
    if (duplicateKey.indexOf(idMovie) !== -1) {
      duplicateKey.splice(duplicateKey.indexOf(idMovie), 1);
      saveToLocalStorage(keyToFindDuplicate, duplicateKey);
    }
  }
}

function saveToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function renderMoviesFromLocalstorageArray(data) {
  const movies = data
    .map(movie => {
      return `
      <li class="movie__item">
        <a href="#show-moovie=${movie.id}"
         class="movie__link" data-movie="${movie.id}">
        <div class="movie__img-wrap">
        <img class="movie__image" ${
          movie.poster_path
            ? 'src="https://image.tmdb.org/t/p/w300' + movie.poster_path + '">'
            : 'src="' + noImg + '">'
        }
        </div>
        </a>
        <div class="movie__info-wrap">
        <h2 class="movie__title">${movie.title}</h2>
        <div class="movie__container">
        <p class="movie__description">
          ${movie.genres.map(({ name }) => name).join(', ')}
         | <span>
        ${getYearFromDate(movie.release_date)}
        </span>
        <div class="movie__container-rating"><span class="movie__rating">${movie.vote_average.toFixed(
          1
        )}</span></div>
        </p>
        </div>
        </div>
        </li>`;
    })
    .join('');

  startLoading();
  refs.movieContainer.innerHTML = movies;
  stopLoading();

  addClickListenerToMovie();
}

export {
  loadArrayFromLocalStorage,
  deleteMovieFromLocalStorage,
  addMovieToWatchedList,
  showMoviesFromLocalstorage,
  addMovieToQueueList,
};
