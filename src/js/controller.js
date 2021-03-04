import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    //guard clause
    if (!id) return;
    recipeView.renderSpinner();

    // 1 Loading Recipe
    await model.loadRecipe(id);

    // 2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1 Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2 Load search results
    await model.loadSearchResults(query);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
