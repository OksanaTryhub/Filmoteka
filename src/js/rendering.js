import { refs } from './refs';
import { getGenreById } from './genres';
import { getYearFromDate } from './api';
import { addClickListenerToMovie } from './clickToMovie';
import { objParam } from './routes';
import noImg from '../images/no-image.jpg';
import { startLoading, stopLoading } from './loader';
import { notificationInvalidInput } from './notifications';

export function renderMovies({ data }) {
  if (!data.results.length) {
    refs.notificationWarning.style.visibility = 'visible';
  }

  const movie = data.results
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
        <p class="movie__description"> 
        ${getGenreById(
          movie.genre_ids,
          objParam.arrayOfGenres
        )} | <span>${getYearFromDate(movie.release_date)}</span></p>
        </div>
        </li>`;
    })
    .join('');

  startLoading();
  refs.movieContainer.innerHTML = movie;
  stopLoading();

  addClickListenerToMovie();
}
