//import {recipe} from "./recipe.js";
import {shoppingList} from "./shoppingList.js";

//Variables

//Event Listeners
document.querySelector(".shopping-list").addEventListener("click", clearListItems);
document.querySelector(".add-shopping-list").addEventListener("click", queryListItem);

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
//prompts for items to add to shopping list, then adds them
function queryListItem(){
	//ask for Items to add to list
	let items = prompt("Enter items, separated by commas, to add to shopping list:");
	//split into array to pass to shoppingList function
	let itemList = items.split(',');
	shoppingList.addItems(itemList);
}

// // test item input
// shoppingList.addItem([" 2 lbs of Chicken", " 1 can of Red Beans"]);



//const results = recipe.searchRecipesByTerm();
//Not working asynchronously
//console.log(results, "3");