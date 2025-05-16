import FormAddMovieComponent from './view/form-add-movie-component.js';
import FilterComponent from './view/filter-component.js';
import MoviePresenter from './presenter/movie-presenter.js';
import MovieModel from './model/movie-model.js';
import { render } from './framework/render.js';

document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.querySelector('.movie-form');
  const filterContainer = document.querySelector('.movie-filter');
  const movieBoardContainer = document.querySelector('#movie-list');

  if (!formContainer || !filterContainer || !movieBoardContainer) {
    console.error('Не найдены необходимые DOM-элементы');
    return;
  }

  const movieModel = new MovieModel();

  const formComponent = new FormAddMovieComponent();
  const filterComponent = new FilterComponent();

  render(formComponent, formContainer);
  render(filterComponent, filterContainer);
  formComponent.setAddMovieHandler(({ title, isWatched }) => {
    movieModel.addMovie({ title, isWatched });
  });

  filterComponent.setFilterHandlers({
    onFilterChange: (filterType) => {
      movieModel.setFilter(filterType);
    },
    onFavoriteFilterToggle: (isChecked) => {
      movieModel.toggleFavoriteFilter(isChecked);
    }
  });

  const moviePresenter = new MoviePresenter({
    boardContainer: movieBoardContainer,
    movieModel,
  });
  moviePresenter.init();
});
