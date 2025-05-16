import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class MovieListComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return '<div class="card-container"></div>';
  }
}