function getGenreById(ids, arrGanres) {
  let arrNamesGenres = [];

  for (const id of ids) {
    for (const genre of arrGanres) {
      if (genre.id === id && genre.name.length < 10) {
        arrNamesGenres.push(genre.name);
      }
    }
  }

  return arrNamesGenres.length > 0
    ? arrNamesGenres.slice(0, 3).join(', ')
    : 'Genre not set';
}

function getGenre(arr) {
  let genresOutput = [];
  for (const genre of arr) {
    genresOutput.push(genre.name);
  }

  return genresOutput.join(', ');
}

export { getGenreById, getGenre };
