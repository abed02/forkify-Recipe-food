import { Array } from 'core-js';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /** */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkUP();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    //luctuer 303

    this._data = data;
    const newMarkup = this._generateMarkUP();
    //create  new markup but without render it just comare it wth old markup
    //only change text and attributes that actully changed from old version
    //this._generateMarkUP(); this just string ,convert it to dom object that living memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    // prettier-ignore
    const currentElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, i) => {
      const currEl = currentElement[i];
      //update change text
      // prettier-ignore
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim('') !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      //for change attribut
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
       <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="recipe">
      <div class="message">
      <div>
      <svg>
      <use href="${icons}#icon-smile"></use>
      </svg>
      </div>
      <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
