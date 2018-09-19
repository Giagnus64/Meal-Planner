// import {http} from "./easyhttp3"

class Recipe {
	constructor(){
		this.APIkey = "5f71f01a77a1fab1f3ff3a9eeb61fc10";
		this.search = "shredded chicken, mint";
		this.recipeBox = document.querySelector(".card-recipe-container");
		this.flexContainer = document.querySelector(".card-container-all");
		this.dayCards = document.querySelector(".card-day-container");
	}
	//Get request
	async get(url){
		const response = await fetch(url);
		const resData = await response.json();
		return resData;
	}
	//** Remember to convert inputs with spaces! i.e. chicken breast needs to become chicken%20breast
	searchRecipesByTerm(){
		let list;
		return this.get(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${this.APIkey}&q=${this.search}`)
		.then(results => {
			//check for errors
			//gives an object with count and recipe array
			console.log(results);
			console.log(results.recipes, "from recipe orig");
			return results.recipes;	
		})
		.catch(err =>console.log(err));
	}

	copyRecipes(recipeArray){
		//work wiht Json.stringify? recursive function
		const recipeList = Array.from(recipeArray);
		console.log(recipeList, "fromcopy");
	}

	searchRecipesByID(){
		return 0;
	}

	recipeLoad(){
		return 0;
	}
	//displays buttons for recipe navigation
	recipeNavBtns(pageNav){
		//create button container div
		const div = document.createElement('div');
		div.classList.add('recipe-controls','mb-3');
		let pageNavBtns = '';
		// if more than 6 recipes, put in next page button
		if(pageNav){
			pageNavBtns = '<button class="prev-page btn btn-warning">Prev Page</button> <button class="next-page btn btn-warning">Next Page</button>'
		}
		const html = `<div class="recipe-controls mb-3">${pageNavBtns}
				<button class="new-search btn btn-info">New Search</button>
			</div>`;
		div.innerHTML = html;
		this.flexContainer.insertBefore(div, this.dayCards);
		return true;
	}
	//spilts recipes, generates/displays html 
	//rethink this - potentially generate html for all items in the list, and store it in something? maybe display changes via css? in order to only show 6 at a time...
	displayRecipes(recipeArray){
		let html = '';
		let pages =1;
		let pageNumber = 0;
		let displayArr = recipeArray;
		let remainingArr;
		let pageNav = false;
		if(recipeArray.length > 6){
			pageNav = true;
			// get number of pages of 6 recipes each
			pages = Math.ceil(recipeArray.length/6);
			//split first page of recipe
			displayArr = recipeArray.slice(0,6);
			//get rest of array
			remainingArr = recipeArray.slice(6);
			//generate html for first 6 recipes
			let page = this.generateRecipeHTML(displayArr, pageNumber);
			//add 1 to page number
			pageNumber++;
			//add the page to the html string
			html+=page;
			//loop over the rest of the pages, adding the corresponding page numbers to the sets of 6 recipes, and increasing the page numbers
			for(let i = 1; i < pages; i++){
				displayArr = remainingArr.slice(0,6);
				remainingArr = remainingArr.slice(6);
				page = this.generateRecipeHTML(displayArr, pageNumber)
				html += page;
				pageNumber++;
			}
		}
		// generate nav buttons for recipes
	    this.recipeNavBtns(pageNav);
		this.recipeBox.innerHTML = html;
	}
	generateRecipeHTML(recipeArray, pageNumber){
		let html = '';
		for(let i = 0; i < recipeArray.length; i++){	
			html += `<div class="col-md-auto p-0 m-1 card-recipe-col data-page="${pageNumber}">
		  		<div class="card card-recipe border-info">
		  			<img class="card-img-top" src="${recipeArray[i].image_url}">
	  				<div class="card-body text-center">
	    				<h5 class="card-title "><strong>${recipeArray[i].title}</strong></h5>
	    				<h6 class="card-subtitle mb-2"><em>${recipeArray[i].publisher}</em></h6>
	    				<a href="${recipeArray[i].f2f_url}" target="_blank" class="btn btn-warning btn-sm">Recipe Page</a>
	    				<a data-recipe-id="${recipeArray[i].recipe_id}" class="btn btn-info btn-sm add-to-plan">Add to Day</a>
	  				</div>
				</div>
			</div>`;
		}
		return html;
	}


}
export const recipe = new Recipe();