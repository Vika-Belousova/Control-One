import MovieListComponent from '../view/movie-list-component.js';
import MovieComponent from '../view/movie-component.js';
import { render } from '../framework/render.js';
import EditModalComponent from '../view/edit-modal-component.js';

export default class MoviePresenter {
  #boardContainer = null;
  #movieModel = null;
  #movieListComponent = new MovieListComponent();
  #modal = null;

  constructor({ boardContainer, movieModel }) {
    this.#boardContainer = boardContainer;
    this.#movieModel = movieModel;
    this.#movieModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    render(this.#movieListComponent, this.#boardContainer);
    this.#renderBoard();
  }

  #handleModelChange() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#movieListComponent.element.innerHTML = '';
    this.#movieModel.movies.forEach(movie => {
      this.#renderMovie(movie);
    });
  }

 #renderMovie(movie) {
    const movieComponent = new MovieComponent(
      movie,
      () => this.#movieModel.deleteMovie(movie), 
      () => this.#showEditModal(movie),
      () => this.#movieModel.updateMovie(movie, { isWatched: !movie.isWatched })
    );
    
    render(movieComponent, this.#movieListComponent.element);
    movieComponent.setClickHandlers();
  }


  #showEditModal(movie) {
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    
this.#modal = new EditModalComponent(
      movie,
      (updatedData) => {
        this.#movieModel.updateMovie(movie, updatedData);
        this.#closeModal();
      },
      () => this.#closeModal()
    );
    
    render(this.#modal, modalContainer);
    this.#modal.setClickHandlers();
  }

  #closeModal() {
    if (this.#modal) {
      this.#modal.removeElement();
      this.#modal = null;
      document.body.removeChild(document.body.lastChild);
    }
  }
}