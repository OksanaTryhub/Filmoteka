import { refs } from './refs';
import { showMoviesFromLocalstorage } from './localstorage';
import { getRoute, setRoute } from './routes';

function highlightActiveLink() {
  const currentURL = window.location.href;
  const currentPage = new URL(currentURL).pathname;

  for (const link of refs.links) {
    const linkPage = new URL(link.href).pathname;
    if (currentPage === linkPage) {
      link.classList.add('active');
      setHeader(refs.background, 'header--library');
    } else {
      link.classList.remove('active');
      setHeader(refs.background, 'header--home');
    }
  }
}
function setHeader(bg, bgClass) {
  bg.classList.add(bgClass);
  bg.classList.remove(
    bgClass === 'header--library' ? 'header--home' : 'header--library'
  );
}

function highlighteHeaderButtons() {
  if (getRoute('mode') === 'queue') {
    refs.buttonLibraryQueue.classList.add('header__btn--active');
  }
  if (getRoute('mode') === 'watched') {
    refs.buttonLibraryWatched.classList.add('header__btn--active');
  }
}

refs.buttonLibraryWatched.addEventListener('click', () => {
  showMoviesFromLocalstorage('watched');
  toggleButtonActivity(
    refs.buttonLibraryWatched,
    'header__btn--active',
    'highlighted',
    true
  );
  toggleButtonActivity(
    refs.buttonLibraryQueue,
    'header__btn--active',
    'highlighted',
    false
  );
  setRoute('library', { mode: 'watched' });
});

refs.buttonLibraryQueue.addEventListener('click', () => {
  showMoviesFromLocalstorage('queue');
  toggleButtonActivity(
    refs.buttonLibraryWatched,
    'header__btn--active',
    'highlighted',
    false
  );
  toggleButtonActivity(
    refs.buttonLibraryQueue,
    'header__btn--active',
    'highlighted',
    true
  );
  setRoute('library', { mode: 'queue' });
});

function toggleButtonActivity(button, activeClass, highlightedClass, isActive) {
  button.classList.toggle(activeClass, isActive);
  button.classList.toggle(highlightedClass, isActive);
}

export { highlighteHeaderButtons, highlightActiveLink };
