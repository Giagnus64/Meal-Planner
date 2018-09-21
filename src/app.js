import {recipe} from "./recipe.js";
import {shoppingList} from "./shoppingList.js";
import {dayCards} from "./dayCards.js";
import {dateCalc} from "./date.js";


//Event Listeners
document.querySelector(".shopping-list").addEventListener("click", clearListItems);
document.querySelector(".add-shopping-list").addEventListener("click", shoppingListAdd);
document.querySelector(".date-button").addEventListener("click", getDateArray);
document.querySelector(".card-day-container").addEventListener("click", dayCardEdit);
document.querySelector(".card-recipe-container").addEventListener("click", recipeCardButtons);
document.querySelector(".card-container-all").addEventListener("click", recipeNavButtons);
document.querySelector("#add-recipe-modal").addEventListener("click", addRecipeToDay);



//Default Behavior/HTML Generation of days
  let today = new Date();
  let dateArray = dateCalc.getWeekArray(today);
  // changes modal options
  dateCalc.changeModalDates(dateArray);
  dayCards.generateDayCards(dateArray);

//Recipe functions
function recipeCardButtons(e){
	//calls function when search button is clicked
	if(e.target.classList.contains("search-recipe-submit")){
		const input = e.target.parentElement.querySelector('textarea');
		if(input.value !== ''){
			recipe.removeError(input);
			recipe.showLoading();
			searchRecipes(input.value);	
		} else{
			recipe.inputError(input);
		}
		return true;	
	}
	if(e.target.classList.contains("add-to-plan")){
		recipe.changeModal(e);
	}

}

function recipeNavButtons(e){
	if(e.target.classList.contains("prev-page")){
		recipe.changePage("prev");
	}
	if(e.target.classList.contains("next-page")){
		recipe.changePage("next");
	}
	if(e.target.classList.contains("new-search")){
		recipe.recipeSearchState(e);
		window.scroll({
  		  top: 0,
 		  behavior: "smooth"
		});
	}

}

//called when user searches recipes
function searchRecipes(input){
	recipe.searchRecipesByTerm(input)
		.then(response =>{
			// checks if recipe array has recipes
			if(response.count === 0){
				//replaces search box and shows error
				recipe.recipeSearchState();
				recipe.searchError('Your search yielded no results. Please search using different terms.');
			} else {
				//response is the array of recipes
				recipe.displayRecipes(response.recipes);
			}		
		})
		.catch(err =>{
			//Show error message
			recipe.searchError('Something went wrong with the search. Please try again.')
			console.log(err);
		});
}

function addRecipeToDay(e){
	const modalCheckbox = document.querySelector('#add-ingredients');
	//gets data from modal to pass in
	const recipeData = {
		source_url:e.target.dataset.recipeUrl,
		title:e.target.dataset.recipeTitle
	};
	//gets meal that will be edited
	let mealToEdit = dayCards.getMeal();
	//checks if ingredients are needed - starts a new get request
	if(modalCheckbox.checked){
		getRecipeIngredients(e.target.dataset.recipeId, mealToEdit);
	} else {
		//add recipe to meal without the need of a new get request
		dayCards.addRecipeToMeal(mealToEdit, recipeData);
	}
}
//uses get request to get ingredient info on recipe
function getRecipeIngredients(recipeID, mealToEdit){
	recipe.searchRecipesByID(recipeID)
		.then(recipe =>{
			//pass response into dayCards to get input
			dayCards.addRecipeToMeal(mealToEdit, recipe);
			// pass items into shopping list
			shoppingList.addItems(recipe.ingredients);
		})
		.catch(err =>{
			recipe.searchError('Something went wrong when getting the ingredients. Please try again.');
			console.log(err);
		});
}
//*** End Recipe Functions ***
//*** Date Function ***
//gets date array from user input
function getDateArray(){
	let dateArray = dateCalc.getDateInput();
	//verifies the user has something in input
	if(dateArray){
		dateCalc.changeModalDates(dateArray);
		dayCards.generateDayCards(dateArray);
	}
	
}

//*** Day-Card Function ***
//delegates clicks on day cards to change state and save edits
function dayCardEdit(e){
	if (e.target.classList.contains("card-day-edit")){
		dayCards.editState(e);
	} else if(e.target.classList.contains("card-day-save")){
		dayCards.saveEdits(e);
	} else if(e.target.classList.contains("add-meal")){
		dayCards.addForm(e);
	}
}

//***Shopping List Functions***
//checks for items to clear by button clicked
function clearListItems(e){
	// if x is clicked, clear list-item
	if(e.target.classList.contains("close-x")){
		shoppingList.clearItem(e);
	// if clear list is clicked, comfirm you want to clear list
	} else if(e.target.classList.contains("clear-shopping-list")){
		if(confirm('Clear all items on shopping list?')){
		shoppingList.clearList();
		}
	}
}
//passes items in textarea to function that adds them to shopping list
function shoppingListAdd(){
	const input = document.querySelector(".shopping-list-input");
	if(input.value !== ''){
		const items = input.value;
		//split into array to pass to shoppingList function
		const itemList = items.split(',');
		shoppingList.addItems(itemList);
	}
	input.value = '';
}


// // test item input
// shoppingList.addItem([" 2 lbs of Chicken", " 1 can of Red Beans"]);

//*** End Shopping List***

/*//API/Recipe-Box Testing
const recipeArray = [
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
},
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
},
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
},
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
},
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
},
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
},
{
f2f_url:"http://food2fork.com/view/35169",
image_url:"http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
publisher:"Closet Cooking",
publisher_url:"http://closetcooking.com",
recipe_id:"35169",
social_rank:100,
source_url:"http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
title:"Buffalo Chicken Chowder"
}
];
recipe.displayRecipes(recipeArray);*/


