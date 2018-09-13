//import {recipe} from "./recipe.js";
import {shoppingList} from "./shoppingList.js";
import {ui} from "./ui.js";

//Variables

//Event Listeners
document.querySelector(".shopping-list").addEventListener("click", clearListItems);
document.querySelector(".add-shopping-list").addEventListener("click", queryListItem);
document.querySelector(".date-input").addEventListener("click", getDateInput);
document.querySelector(".card-day-container").addEventListener("click", dayCardEdit);

//Default Behavior/HTML Generation
  let today = new Date();
  let dateArray = getWeekArray(today);
  ui.generateDayCards(dateArray);

// *** Date Functions ***
function getDateInput(){
	//VERIFY?!
	//prompt for start date
	let date = prompt("Enter Start Date as mm/dd");
	// split input into array
	let dateArray = date.split("/");
	//make a new date object
	let startDate = new Date();
	//set month (adding 1 due to month array starting at 0)
	startDate.setMonth(dateArray[0] - 1);
	startDate.setDate(dateArray[1]);
	let userDate = getWeekArray(startDate);
	ui.generateDayCards(userDate);
	
	// test
	//console.log(dateArray, startDate);
}

//enter start date, default is today, based on user input
function getWeekArray(startDate){
	//make array to generate html with
	const dateArray = [];
	//push initial date to Array
	let firstDay = startDate.getDate();
	let firstMonth = startDate.getMonth();
	// push date string to array (adding 1 to fix for month array)
	dateArray.push((firstMonth + 1) + "/"+ firstDay);
	//push next 6 days to array
	for(let i=0; i<6; i++){
		startDate.setDate(startDate.getDate() + 1)//** change this;
		let day = startDate.getDate();
		let month = startDate.getMonth();
		// push date string to array( adding 1 to fix for month array)
		dateArray.push((month + 1) + "/"+ day);
		//test
		//console.log(dateArray, startDate);
	}
	return dateArray;
}

//*****

//Day-Card Functions
function dayCardEdit(e){
	if (e.target.classList.contains("card-day-edit")){
		ui.editState(e);
	} else if(e.target.classList.contains("card-day-save")){
		ui.saveEdits(e);
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