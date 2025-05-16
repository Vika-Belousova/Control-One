import { AbstractComponent } from '../framework/view/abstract-component.js';
import { FilterType } from '../const.js';

export default class FilterComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return `
      <fieldset>
        <legend>Статус:</legend>
        <label><input type="radio" name="status-filter" value="${FilterType.ALL}" checked /> Все</label>
        <label><input type="radio" name="status-filter" value="${FilterType.WATCHED}" /> Неросмотренные</label>
        <label><input type="radio" name="status-filter" value="${FilterType.UNWATCHED}" /> Просмотренные</label>
      </fieldset>

      <label><input type="checkbox" id="favorite-filter" /> Показывать только избранное</label>
    `;
  }

  setFilterHandlers({ onFilterChange, onFavoriteFilterToggle }) {
    if (!this.element) {
      console.warn('FilterComponent element is not rendered yet.');
      return;
    }

    const statusInputs = this.element.querySelectorAll('input[name="status-filter"]');
    if (statusInputs.length > 0) {
      statusInputs.forEach(input => {
        input.addEventListener('change', (evt) => {
          onFilterChange(evt.target.value);
        });
      });
    } else {
      console.warn('No status-filter inputs found.');
    }

    const favoriteInput = this.element.querySelector('#favorite-filter');
    if (favoriteInput) {
      favoriteInput.addEventListener('change', (evt) => {
        onFavoriteFilterToggle(evt.target.checked);
      });
    } else {
      console.warn('favorite-filter input not found!');
    }
  }
}
