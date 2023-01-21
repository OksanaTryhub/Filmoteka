
export function setPageToUrl(page) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('page', page);
  history.pushState({}, '', currentUrl.toString());
}
