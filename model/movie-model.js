import { movies } from '../mock/movie.js';
import { FilterType } from '../const.js';

export default class MovieModel {
  #movies;
  #observers = [];
  #currentFilter = FilterType.ALL;
  #showOnlyFavorite = false;

  constructor() {
    this.#movies = [...movies];
  }

  get movies() {
    let filtered = [...this.#movies];

    if (this.#currentFilter === FilterType.WATCHED) {
      filtered = filtered.filter(movie => movie.isWatched);
    } else if (this.#currentFilter === FilterType.UNWATCHED) {
      filtered = filtered.filter(movie => !movie.isWatched);
    }

    if (this.#showOnlyFavorite) {
      filtered = filtered.filter(movie => movie.isFavorite);
    }

    return filtered;
  }

  addMovie({ title, isWatched = false, isFavorite = false }) {
    const newMovie = { title, isWatched, isFavorite };
    this.#movies.push(newMovie);
    this.#notifyObservers();
    return newMovie;
  }

  updateMovie(targetMovie, newData) {
    const index = this.#movies.indexOf(targetMovie);
    if (index !== -1) {
      this.#movies[index] = { ...targetMovie, ...newData };
      this.#notifyObservers();
    }
  }

  deleteMovie(targetMovie) {
    this.#movies = this.#movies.filter(movie => movie !== targetMovie);
    this.#notifyObservers();
  }

  setFilter(filterType) {
    this.#currentFilter = filterType;
    this.#notifyObservers();
  }
о
  toggleFavoriteFilter(isActive) {
    this.#showOnlyFavorite = isActive;
    this.#notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  #notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}
