import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const notificationInvalidInput = () =>
  Notify.failure(
    'Sorry, there are no movies matching your search query. Please try again.'
  );
