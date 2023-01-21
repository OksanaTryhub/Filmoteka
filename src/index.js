import { refs } from './js/refs';
import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  LANGUAGE,
} from './js/api-vars';
import { getFilmsByUrl, getGenres, getYearFromDate } from './js/api';
import { getGenreById, getGenre } from './js/genres';
import { highlightActiveLink } from './js/header';
import { searchWordToInput } from './js/routes';
import { checkForm } from './js/searchForm';
import { onThemeToggle } from './js/switch-btn';
import noImg from './images/no-image.jpg';

window.addEventListener('load', highlightActiveLink); // подсветка кнопок текущей страницы в хедере
refs.themeToggle.addEventListener('click', onThemeToggle);
refs.searchForm.addEventListener('submit', checkForm);
searchWordToInput();
