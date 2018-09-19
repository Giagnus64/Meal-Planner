// import {http} from "./easyhttp3"

class Recipe {
	constructor(){
		this.APIkey = "5f71f01a77a1fab1f3ff3a9eeb61fc10";
		this.search = "shredded chicken, mint";
		this.recipeBox = document.querySelector(".card-recipe-container");
		this.flexContainer = document.querySelector(".card-container-all");
		this.dayCards = document.querySelector(".card-day-container");
		this.modalTitle = document.querySelector("#modal-title");
		this.modalButton = document.querySelector("#add-recipe-modal");
	}
	//Get request
	async get(url){
		const response = await fetch(url);
		const resData = await response.json();
		return resData;
	}
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
	searchRecipesByID(){
		return 0;
	}

	recipeLoad(){
		return 0;
	}

	changeModal(e){
		const addToDayBtn = e.target;
		const recipeID = e.target.dataset.recipeId;
		const recipeTitle = e.target.parentElement.firstElementChild.innerText;
		this.modalTitle.innerHTML = `Add Recipe: ${recipeTitle}`;
		this.modalButton.setAttribute('data-recipe-id', recipeID);
		return true;
	}

	// navigates through multiple pages when required
	changePage(navigation){
		const recipeCards = document.querySelectorAll(".card-recipe-col");
		const pages = Math.ceil(recipeCards.length / 6);
		const firstVisible = document.querySelector(".card-recipe-col:not(.card-hidden)");
		const currentPage = parseInt(firstVisible.dataset.page);
		let pageToShow;
		//checks if previous page is available, hides all other pages except for page requested by user
		if(navigation === 'prev'){
			if(currentPage === 1){
				return false;
			}
			pageToShow = (currentPage - 1).toString();			
			this.hidePages(pageToShow);
			return true;
		//same as above, checks if next page is available
		} else {
			pageToShow = (currentPage + 1).toString();
			if(currentPage === pages){
				return false;
			}
			this.hidePages(pageToShow);
			return true;
		}
	}

	//hides extra recipe pages when navigating
	hidePages(page){
		const recipeCards = document.querySelectorAll(".card-recipe-col");
		recipeCards.forEach(card =>{
				card.classList.remove("card-hidden");
				if(card.dataset.page !== page){
					card.classList.add("card-hidden");
				}
			});
		return true;
	}

	//changes recipe div back to search state
	recipeSearchState(e){
		//removes recipe page nav buttons
		e.target.parentElement.parentElement.removeChild(e.target.parentElement);
		this.recipeBox.innerHTML = `<form>
					<div class="form-group">
						<h2 class="recipe-search-title text-center">Search For Recipes</h2>
		   				 <label class="text-center" for="search-input">Enter ingredients separated by commas, or the name of a dish</label>
		    			<textarea class="form-control" id="search-input" rows="1"></textarea>
		    			<button type="button" class="btn btn-info mx-auto mt-3 search-recipe-submit">Search</button>
	  				</div>
	  			</form>`;
	  	return true;
	}

	//displays buttons for recipe navigation
	recipeNavBtns(pageNav){
		//create button container div
		const div = document.createElement('div');
		div.classList.add('recipe-controls-container','mb-3');
		let pageNavBtns = '';
		// if more than 6 recipes, put in next page button
		if(pageNav){
			pageNavBtns = '<button class="prev-page btn btn-warning btn-sm">Prev Page</button> <button class="next-page btn btn-warning btn-sm">Next Page</button>'
		}
		const html = `<div class="recipe-controls">${pageNavBtns} <button class="new-search btn btn-info btn-sm">New Search</button>
			</div>`;
		div.innerHTML = html;
		this.flexContainer.insertBefore(div, this.dayCards);
		return true;
	}

	//splits recipes, generates/displays html 
	displayRecipes(recipeArray){
		let html = '';
		let pages;
		let pageNumber = 1;
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
			for(let i = 0; i <= pages; i++){
				displayArr = remainingArr.slice(0,6);
				remainingArr = remainingArr.slice(6);
				page = this.generateRecipeHTML(displayArr, pageNumber)
				html += page;
				pageNumber++;
			}
		} else{
			html = this.generateRecipeHTML(displayArr);
		}
		// generate nav buttons for recipes
	    this.recipeNavBtns(pageNav);
		this.recipeBox.innerHTML = html;
		this.hidePages('1');
		return true;
	}
	//generates html with proper page numbers for each recipe "set"
	generateRecipeHTML(recipeArray, pageNumber){
		let html = '';
		for(let i = 0; i < recipeArray.length; i++){	
			html += `<div class="col-md-auto p-0 m-1 card-recipe-col" data-page="${pageNumber}">
		  		<div class="card card-recipe border-info">
		  			<img class="card-img-top" src="${recipeArray[i].image_url}">
	  				<div class="card-body text-center">
	    				<h5 class="card-title "><strong>${recipeArray[i].title}</strong></h5>
	    				<h6 class="card-subtitle mb-2"><em>${recipeArray[i].publisher}</em></h6>
	    				<a href="${recipeArray[i].source_url}" target="_blank" class="btn btn-warning btn-sm">Recipe Page</a>
	    				<a data-toggle="modal" data-target="#add-to-day" data-recipe-id="${recipeArray[i].recipe_id}" class="btn btn-info btn-sm add-to-plan">Add to Day</a>
	  				</div>
				</div>
			</div>`;
		}
		return html;
	}


}
export const recipe = new Recipe();