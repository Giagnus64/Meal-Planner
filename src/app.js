//import {recipe} from "./recipe.js";
import {shoppingList} from "./shoppingList.js";

//Variables

//Event Listeners
document.querySelector(".shopping-list").addEventListener("click", clearListItems);
document.querySelector(".add-shopping-list").addEventListener("click", queryListItem);
document.querySelector(".date-input").addEventListener("click", getDateInput);

//Default Behavior/HTML Generation
// let today = new Date();
// getWeekArray(today);

// *** Date Functions ***
function getDateInput(){
	//VERIFY?!
	let date = prompt("Enter Start Date as mm/dd");
	let dateArray = date.split("/");
	let startDate = new Date();
	startDate.setMonth(dateArray[0]);
	startDate.setDate(dateArray[1]);
	getWeekArray(startDate);
	// test
	//console.log(dateArray, startDate);
}

//enter start date, default is today, based on user input
function getWeekArray(startDate){
	//make array to generate html with
	const dateArray = [];
	//establish start date  day number to reset date after each iteration
	const startDateDay = startDate.getDate();
	//add 6 days to start date
	for(let i=0; i<7; i++){
		startDate.setDate(startDate.getDate() + i);
		let day = startDate.getDate();
		let month = startDate.getMonth();
		// date date string to array
		dateArray.push(month + "/"+ day);
		startDate.setDate(startDateDay);
		//test
		//console.log(dateArray, startDateDay);
	}
}
//*****

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
//*** End Shopping List***



//const results = recipe.searchRecipesByTerm();
//Not working asynchronously
//console.log(results, "3");