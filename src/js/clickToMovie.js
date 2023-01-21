import { showMovieDetails } from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function addClickListenerToMovie() {
  document.querySelectorAll('.movie__link').forEach(element => {
    element.addEventListener('click', event => {
      try {
        showMovieDetails(element.dataset.movie);
      } catch (error) {
        Notify.failure(error.message);
      }
      event.preventDefault();
    });
  });
}
