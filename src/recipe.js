class Recipe {
	constructor(){
		this.APIkey = "5f71f01a77a1fab1f3ff3a9eeb61fc10";
		this.recipeBox = document.querySelector(".card-recipe-container");
		this.flexContainer = document.querySelector(".card-container-all");
		this.dayCards = document.querySelector(".card-day-container");
		this.modalTitle = document.querySelector("#modal-title");
		this.modalButton = document.querySelector("#add-recipe-modal");
		this.modal = document.querySelector('.modal');
		//cors input for testing
		//this.cors = 'https://cors-anywhere.herokuapp.com/';
		//testing API search
		//this.search = "shredded chicken, mint";
	}
	//Get request
	async get(url){
		const response = await fetch(url);
		const resData = await response.json();
		return resData;
	}

	searchRecipesByTerm(input){
		return this.get(`https://food2fork.com/api/search?key=${this.APIkey}&q=${input}`)
		.then(results => {
			//gives an object with count and recipe array
			return results;	
		})
		.catch(err => console.log(err));
		
	}

	searchRecipesByID(recipeID){
		return this.get(`https://food2fork.com/api/get?key=${this.APIkey}&rId=${recipeID}`)
			.then(results => {
				return results.recipe;
			})
			.catch(err => {
				this.removeAlert();
				this.searchError('There was an error getting the recipe. Please try again.')
				//put in error about getting ingredients
				console.log(err);
			});
	}

	//Get recipe data from recipe-card html and place in modal
	changeModal(e){
		const addToDayBtn = e.target;
		const recipeID = addToDayBtn.dataset.recipeId;
		const recipeTitle = addToDayBtn.parentElement.firstElementChild.innerText;
		const recipeLink = addToDayBtn.previousElementSibling.getAttribute('href');
		this.modalTitle.innerHTML = `Add Recipe: ${recipeTitle}`;
		this.modalButton.setAttribute('data-recipe-id', recipeID);
		this.modalButton.setAttribute('data-recipe-url', recipeLink);
		this.modalButton.setAttribute('data-recipe-title', recipeTitle);
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
		//removes recipe page nav buttons if there
		if(e){
			e.target.parentElement.parentElement.removeChild(e.target.parentElement);
		}
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
			html += `<div class="col-md-6 col-md-4 p-0 m-1 card-recipe-col" data-page="${pageNumber}">
		  		<div class="card card-recipe border-info">
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
	//shows error on search input if empty
	inputError(input){
		//add error class
		const div = document.createElement('div');
		const text = document.createTextNode('Input cannot be blank.');
		div.appendChild(text);
		div.classList.add("invalid-feedback");
		this.removeError(input);
		input.classList.add('is-invalid');
		input.insertAdjacentElement('afterEnd', div);	
		return true;
	}
	//removes error message from search input
	removeError(input){
		//checks is error message exists
		if(input.nextElementSibling.classList.contains("invalid-feedback")){
			input.parentElement.removeChild(input.nextElementSibling);
			input.classList.remove('is-invalid');
		}
	}
	//creates alert for error
	searchError(message){
		//create alert element
		const div = document.createElement('div');
		//fill with error passed in
		div.innerHTML = `${message}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
		div.classList.add('alert', 'alert-danger','alert-dismissible');
		div.setAttribute('role','alert');
		//add alert to DOM
		this.recipeBox.insertAdjacentElement('beforeBegin', div);
	}
	//removes current Alert from the page
	removeAlert(){
		const alert = document.querySelector('.alert');

		console.log(alert);
		if(alert){
			alert.parentElement.removeChild(alert);
		}
		
	}

	loadingIngredients(){
		//create alert element
		const div = document.createElement('div');
		//give message
		div.innerHTML = `Getting ingredients...`;
		div.classList.add('alert', 'alert-info');
		div.setAttribute('role','alert');
		//add alert to DOM
		this.recipeBox.insertAdjacentElement('beforeBegin', div);
	}

	recipeAddSuccess(){
		const div = document.createElement('div');
		div.innerHTML = `Recipe Added!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
		div.classList.add('alert', 'alert-success', 'alert-dissmissable');
		div.setAttribute('role', 'alert');
		this.recipeBox.insertAdjacentElement('beforeBegin', div);
	}

	//shows loading gif while waiting for get request response
	showLoading(){
		this.recipeBox.innerHTML = `<div class="lds-css ng-scope">
		<div class="lds-spinner" style="100%;height:100%"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
	}
}
export const recipe = new Recipe();