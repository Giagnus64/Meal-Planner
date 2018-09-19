import {recipe} from "./recipe.js";
import {shoppingList} from "./shoppingList.js";
import {dayCards} from "./dayCards.js";
import {dateCalc} from "./date.js";

//Variables

//Event Listeners
document.querySelector(".shopping-list").addEventListener("click", clearListItems);
document.querySelector(".add-shopping-list").addEventListener("click", shoppingListAdd);
document.querySelector(".date-button").addEventListener("click", getDateArray);
document.querySelector(".card-day-container").addEventListener("click", dayCardEdit);
document.querySelector(".card-recipe-container").addEventListener("click", recipeCardButtons);
document.querySelector(".card-container-all").addEventListener("click", recipeNavButtons);


//searchRecipes();



//Default Behavior/HTML Generation of days
  let today = new Date();
  let dateArray = dateCalc.getWeekArray(today);
  dateCalc.changeModalDates(dateArray);
  dayCards.generateDayCards(dateArray);

//Recipe functions
function recipeCardButtons(e){
	//calls function when search button is clicked
	if(e.target.classList.contains("search-recipe-submit")){
		const input = e.target.previousElementSibling.value;
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
function searchRecipes(){
	recipe.searchRecipesByTerm()
		.then(response =>{
			//this will be what is returned from the recipe class
			//recipeArray = response;
			//return recipeArray;
		})
		.catch(err =>{
			//Show error message;
			console.log(err);
		});
	//return recipeArray;
}



//Date button
//gets date array from user input
function getDateArray(){
	let dateArray = dateCalc.getDateInput();
	//verifies the user has something in input
	if(dateArray){
		dateCalc.changeModalDates(dateArray);
		dayCards.generateDayCards(dateArray);
	}
	
}

//Day-Card Functions
//delegates clicks on day cards to change state and save edits
function dayCardEdit(e){
	if (e.target.classList.contains("card-day-edit")){
		dayCards.editState(e);
	} else if(e.target.classList.contains("card-day-save")){
		dayCards.saveEdits(e);
	}
}

//*** Shopping List Functions ***
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

//API Testing
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
recipe.displayRecipes(recipeArray);


