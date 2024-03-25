import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import addRecipeView from './views/addRecipeView.js';

const controleRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //render spinner brdore load
    // 0) update  result view to marked result view
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 1) loading recipe
    await model.loadRecipe(id); // return nothing
    //2) rendering recipe

    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.error(error);
  }
};

const controllerSearchResult = async function () {
  try {
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2)Load search result
    await model.loadSearchResult(query);
    console.log(model.state);

    //3) render the search
    resultsView.renderSpinner();
    resultsView.render(model.getSearchResultsPage(1));

    //  4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  //3) render new Results
  resultsView.renderSpinner();

  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) render New pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newSErvings) {
  // Update the recipe serving(in stat)

  model.updateServings(newSErvings);

  //update recipe view
  // recipeView.render(model.state.recipe);  this will update the entire view so we need to create render update
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  //1) add or remoce bookmarks
  //when to bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);

  //  2) update revibe view
  recipeView.update(model.state.recipe);
  //3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controleBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // SHOW LOADING SPINNER 6600d324e54bb900144b5f87
    addRecipeView.renderSpinner();
    //Upload new Recipe

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //sessues message
    console.log(model.state.bookmarks);
    addRecipeView.renderMessage();

    // RENDER BOOKMARK biew
    bookmarksView.render();

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`); //change url without refresh

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      //close form
    }, MODEL_CLOSE_SEC * 1000);
  } catch (Error) {
    console.log('%', Error);
    addRecipeView.renderError(Error.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRendeder(controleBookmarks);

  recipeView.addHandlerRender(controleRecipe);
  recipeView.addEventUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookMark);
  searchView.addHandlerSearch(controllerSearchResult);
  paginationView.addHandlerClick(controlPagination);
  AddRecipeView._addHandlerUploadWindow(controlAddRecipe);
};

init();
