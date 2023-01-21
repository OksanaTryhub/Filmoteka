import { Loading } from 'notiflix/build/notiflix-loading-aio';

const startLoading = () => Loading.hourglass('Loading...');

const stopLoading = () => Loading.remove();

export { startLoading, stopLoading };
