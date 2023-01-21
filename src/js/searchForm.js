//  проверка данных  в форме
import { refs } from './refs';

export function checkForm(event) {
  event.preventDefault();
  let inputValue = refs.searchForm.elements.search.value.trim();

  if (!inputValue) {
    refs.notificationWarning.style.visibility = 'visible';
    return;
  }
  refs.searchForm.elements.search.value = inputValue;
  refs.searchForm.submit();
}
