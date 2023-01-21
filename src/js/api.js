import axios from 'axios';

import {
  API_KEY,
  BASE_URL,
  TREND_URL,
  SEARCH_URL,
  ID_URL,
  LANGUAGE,
} from './api-vars';

import { displayPagination } from './pagination';
import { renderMovies } from './rendering';
import { renderMovieDetails } from './backdrop';

async function getGenres() {
  try {
    const {
      data: { genres },
    } = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`
    );
    return genres;
  } catch (error) {
    throw error;
  }
}

async function loadArrayMoviesByArrayOfIds(arrayOfMovieIds) {
  const arrayOfPromises = arrayOfMovieIds.map(async movieId => {
    const { data } = await axios.get(
      `${ID_URL}${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
    );
    return data;
  });
  const movies = await Promise.all(arrayOfPromises);
  return movies;
}

function getYearFromDate(date) {
  if (!date) {
    return 'no data';
  }
  const dateRelease = new Date(date);
  return dateRelease.getFullYear();
}

async function getFilmsByUrl(url) {
  try {
    const response = await axios.get(url);
    renderMovies(response);
    displayPagination(response.data);
  } catch (error) {
    throw error;
  }
}

function showMovieDetails(id) {
  console.log(id);
  const url = `${ID_URL}${id}?api_key=${API_KEY}&language=${LANGUAGE}`;
  axios
    .get(url)
    .then(response => {
      renderMovieDetails(response.data);
    })
    .catch(function (error) {
      throw error;
    });
}

function getUrlFromSearchParam() {
  const currentURL = window.location.href;
  const searchWord = new URL(currentURL).searchParams.get('search');
  const page = new URL(currentURL).searchParams.get('page');
  let query = '';
  if (searchWord) {
    query = getUrl(SEARCH_URL, searchWord, page);
  } else {
    query = getUrl(TREND_URL, null, page);
  }
  return query;
}

function getUrl(baseUrl, searchWord, page) {
  return (
    baseUrl +
    `?api_key=${API_KEY}&language=${LANGUAGE}` +
    (searchWord ? `&query=${searchWord}` : '') +
    (page ? `&page=${page}` : '')
  );
}

export {
  getFilmsByUrl,
  getGenres,
  getYearFromDate,
  showMovieDetails,
  getUrlFromSearchParam,
  loadArrayMoviesByArrayOfIds,
};
