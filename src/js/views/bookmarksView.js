import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks yet ';
  _message = '';

  addHandlerRendeder(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkUP() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarksView();
