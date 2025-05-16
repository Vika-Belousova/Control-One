import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class EditModalComponent extends AbstractComponent {
  constructor(movie, onSave, onCancel) {
    super();
    this.movie = movie;
    this.onSave = onSave;
    this.onCancel = onCancel;
  }

  get template() {
    return `
      <div class="modal-overlay">
        <div class="modal">
          <h2>Редактировать фильм</h2>
          <form id="edit-form">
            <label for="edit-title">Название:</label>
            <input type="text" id="edit-title" value="${this.movie.title}" required />
            
            <div class="watched-toggle">
              <label for="edit-status">Просмотрен:</label>
              <label class="switch">
                <input type="checkbox" id="edit-status" ${this.movie.isWatched ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>

            <div class="favorite-toggle">
              <label for="edit-favorite">В избранном:</label>
              <label class="switch">
                <input type="checkbox" id="edit-favorite" ${this.movie.isFavorite ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>

            <div class="modal-actions">
              <button type="submit">Сохранить</button>
              <button type="button" class="cancel-btn">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  setClickHandlers() {
    this.element.querySelector('#edit-form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      const title = this.element.querySelector('#edit-title').value;
      const isWatched = this.element.querySelector('#edit-status').checked;
      const isFavorite = this.element.querySelector('#edit-favorite').checked;
      
      if (title) {
        this.onSave({ title, isWatched, isFavorite });
      }
    });

    this.element.querySelector('.cancel-btn').addEventListener('click', this.onCancel);
  }
}