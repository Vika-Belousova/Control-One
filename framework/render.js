import { AbstractComponent } from '../framework/view/abstract-component.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend'  
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export const render = (component, container, place = RenderPosition.BEFOREEND) => {
  if (!component) {
    throw new Error('Компонент не передан');
  }

  if (!container) {
    throw new Error('Контейнер не существует'); 
  }

  if (!component.element) {
    throw new Error('Элемент компонента не создан. Убедитесь, что компонент имеет метод template');
  }

  const parent = container instanceof AbstractComponent
    ? container.element
    : container;
  
  const child = component.element;

  if (place === RenderPosition.AFTERBEGIN) {
    parent.prepend(child);
  } else {
    parent.append(child);
  }
};

export const replace = (newComponent, oldComponent) => {
  const newChild = newComponent.element;
  const oldChild = oldComponent.element;

  if (!oldChild || !oldChild.parentElement) {
    throw new Error('Нельзя заменить несуществующий компонент');
  }

  oldChild.parentElement.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  const element = component.element;
  if (element && element.parentElement) {
    element.parentElement.removeChild(element);
    component.removeElement();
  }
};