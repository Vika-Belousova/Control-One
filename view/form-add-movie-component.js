import { AbstractComponent } from '../framework/view/abstract-component.js';


export default class FormAddMovieComponent extends AbstractComponent {
  constructor() {
    super();
    this.addMovieHandler = null;
  }

  get template() {
    return `
      <form id="movie-form">
        <label for="movie-title">Название фильма:</label>
        <input type="text" id="movie-title" placeholder="Например, Начало" required />
        
        <div class="watched-toggle">
          <label for="movie-status">Отметить как непросмотренный:</label>
          <label class="switch">
            <input type="checkbox" id="movie-status">
            <span class="slider"></span>
          </label>
        </div>

        <button type="submit">Добавить Фильм</button>
      </form>
    `;
  }

 setAddMovieHandler(handler) {
  this.addMovieHandler = handler;
  this.element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const title = this.element.querySelector('#movie-title').value;
    const isWatched = this.element.querySelector('#movie-status').checked;

    if (title) {
      handler({ title, isWatched });
      this.element.reset(); 
    }
  });
}

}