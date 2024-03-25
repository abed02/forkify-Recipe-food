import View from './View.js';

import icons from 'url:../../img/icons.svg';
class Pagination extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handelr) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handelr(goToPage);
    });
  }
  _generateMarkUP() {
    const currentPage = this._data.page;
    // how many pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    //last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${currentPage - 1}</span>
    </button>
   
      `;
    }

    //other pages
    if (currentPage < numPages) {
      return `
      <button data-goto="${
        currentPage + -1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${currentPage - 1}</span>
    </button>
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
   
      `;
    }
    //page 1 and ther are No other pages

    return '';
  }
}

export default new Pagination();
