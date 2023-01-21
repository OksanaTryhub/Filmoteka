import { refs } from './refs';
import { getGenres, getFilmsByUrl, getUrlFromSearchParam } from './api';
import { showMoviesFromLocalstorage } from './localstorage';
import { highlighteHeaderButtons } from './header';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const routes = {
  '/': home,
  '/project-group-5-js/': home,
  '/library': library,
  '/project-group-5-js/library': library,
};

const route = window.location.pathname;

if (routes[route]) {
  routes[route]();
} else {
  console.log('Route not found');
}

const objParam = {
  arrayOfGenres: [],
};

async function home() {
  console.log('Home page');
  const params = new URLSearchParams(window.location.search);

  if (params.has('search')) {
    console.log(`Search: ${params.get('search')}`);
  }

  try {
    const arrOfGenres = await getGenres();
    objParam.arrayOfGenres = arrOfGenres;
    await getFilmsByUrl(getUrlFromSearchParam());
  } catch (error) {
    console.log('🚀 ~ file: routes.js:45 ~  ~ error', error);
    Notify.failure(error.message);
  }
}

function searchWordToInput() {
  const currentURL = window.location.href;
  const searchWord = new URL(currentURL).searchParams.get('search');
  if (searchWord !== null) {
    refs.searchMovieInput.value = searchWord.trim();
  }
}

function library() {
  displayElement(refs.searchForm, false);
  refs.headerWrap.classList.add('visually-hidden');
  displayElement(refs.libraryButtonsBlock, true);

  const mode = getRoute('mode') || 'queue';
  console.log('🚀 ~ file: index.js:200 ~ library ~ mode', mode);

  showMoviesFromLocalstorage(mode);
  setRoute('library', { mode: mode });
  highlighteHeaderButtons();
}

function getRoute(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function setRoute(route, params) {
  const searchParams = new URLSearchParams(params);
  const url = `${route}?${searchParams.toString()}`;

  window.history.pushState({}, '', url);
}

function displayElement(element, isHide) {
  if (element) {
    element.style.display = isHide ? 'block' : 'none';
  }
}

export { getRoute, setRoute, searchWordToInput, objParam };
