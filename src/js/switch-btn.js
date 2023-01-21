import { refs } from './refs';

export function onThemeToggle(event) {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
}
function addDarkClassToHTML() {

  try {
    if (localStorage.getItem('theme') === 'dark') {
      onToggleClassAndIcon('add', 'dark_mode');
    } else {
      onToggleClassAndIcon('remove', 'wb_sunny');
    }
  } catch (err) { }
}
addDarkClassToHTML();

function onToggleClassAndIcon(method, nameIcon) {
  refs.html.classList[method]('dark');
  refs.iconTheme.textContent = `${nameIcon}`;
}
