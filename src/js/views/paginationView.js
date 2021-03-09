import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // Challenge - refactorin buttons
  _generateMarkupButton(type, curPage) {
    if (type === 'next') {
      return `
      <button class="btn--inline pagination__btn--${type}">
       <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right></use>
          </svg>
        </button>
    `;
    }
    if (type === 'prev') {
      return `
      <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;
    }
  }
  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1 and there other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage);
    }

    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage);
    }

    // Other Page
    if (currentPage < numPages) {
      return `${this._generateMarkupButton(
        'prev',
        currentPage
      )}${this._generateMarkupButton('next', currentPage)}`;
    }

    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
