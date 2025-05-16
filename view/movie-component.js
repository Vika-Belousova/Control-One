import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class MovieComponent extends AbstractComponent {
  constructor(movie, onDelete, onEdit, onToggleWatched) {
    super();
    this.movie = movie;
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.onToggleWatched = onToggleWatched;
  }

  get template() {
    return `
      <div class="card ${this.movie.isWatched ? 'watched' : ''}">
        <div class="card-title">${this.movie.title}</div>
        <div class="card-details">
          <p>Статус: ${this.movie.isWatched ? 'Просмотрен' : 'Не просмотрен'}</p>
          <p>${this.movie.isFavorite ? '⭐ В избранном' : ''}</p>
        </div>
        <div class="card-actions">
          <button class="toggle-watched-btn">${this.movie.isWatched ? 'Не просмотрен' : 'Просмотрен'}</button>
          <button class="edit-btn">Редактировать</button>
          <button class="delete-btn">Удалить</button>
        </div>
      </div>
    `;
  }

  setClickHandlers() {
    this.element.querySelector('.delete-btn').addEventListener('click', () => {
      this.onDelete();
    });
    
    this.element.querySelector('.edit-btn').addEventListener('click', () => {
      this.onEdit(this.movie);
    });

    this.element.querySelector('.toggle-watched-btn').addEventListener('click', () => {
      this.onToggleWatched();
    });

    this.element.addEventListener('click', (e) => {
      if (e.target === this.element || e.target.classList.contains('card-title')) {
        this.element.classList.toggle('expanded');
      }
    });
  }
} 