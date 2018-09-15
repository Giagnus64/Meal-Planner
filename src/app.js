//import {recipe} from "./recipe.js";
import {shoppingList} from "./shoppingList.js";
import {dayCards} from "./dayCards.js";
import {dateCalc} from "./date.js";

//Variables

//Event Listeners
document.querySelector(".shopping-list").addEventListener("click", clearListItems);
document.querySelector(".add-shopping-list").addEventListener("click", shoppingListAdd);
document.querySelector(".date-button").addEventListener("click", getDateArray);
document.querySelector(".card-day-container").addEventListener("click", dayCardEdit);

//Default Behavior/HTML Generation
  let today = new Date();
  let dateArray = dateCalc.getWeekArray(today);
  dayCards.generateDayCards(dateArray);

//Date button
function getDateArray(){
	let dateArray = dateCalc.getDateInput();
	if(dateArray){
		dayCards.generateDayCards(dateArray);
	}
	
}

//*****
//Day-Card Functions
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



//const results = recipe.searchRecipesByTerm();
//Not working asynchronously
//console.log(results, "3");