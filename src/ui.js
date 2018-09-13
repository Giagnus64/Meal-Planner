class UI{
	constructor(){
		this.dayCardContainer = document.querySelector(".card-day-container");
	}

	generateDayCards(dateArray){
		let html = '';
		dateArray.forEach(date => {
			html += `<div class="col-md-auto p-0 card-column">
					<div class="card border-primary card-day">
					  	<div class="card-body">
						    <h5 class="card-title">${date}</h5>
						    <h6 class="card-subtitle text-muted">Breakfast</h6>
						    <p class="card-text"><a target="_blank" href="http://www.allrecipes.com" class="recipe-link ">Avocado Toast with Eggs</a></p>
						    <h6 class="card-subtitle text-muted">Lunch</h6>
						    <p class="card-text"><a class="recipe-link " target="_blank">Chicken Cutlet with Broccoli Rabe</a></p><h6 class="card-subtitle text-muted">Dinner</h6>
						    <p class="card-text"><a class="recipe-link" target="_blank">Recipe Title</a></p>
						    	<button class="card-link btn btn-outline-primary card-day-edit">Edit</button>
					 	 </div>
					</div>
				</div>`		
		});
		this.dayCardContainer.innerHTML = html;
	}

	editState(e){
		//disable other edit button and set styles to disabled
		const otherButtons = document.querySelectorAll('.card-day-edit');
		otherButtons.forEach(button =>{
			button.classList.add("disabled");
			button.disabled = true;
		})		
		//get card element and column element variables
		const card = e.target.parentElement;
		const column = card.parentElement.parentElement;
		//target and change card text that will be edited
		// use of ternary operator to check if recipe link has an href, and if not pushes string 'recipe link' in place
		const mealList = card.querySelectorAll(".card-text");
		for(let i = 0; i<3; i++){
			mealList[i].innerHTML = `<form>
	  					<div class="form-group">
						    <input type="text" class="form-control form-control-sm input-meal" id="breakfast-recipe" value="${mealList[i].children[0].innerText}">
						 </div>
						 <div class="form-group">
						    <input type="text" class="form-control form-control-sm input-link" id="breakfast-recipe-link" value="${(mealList[i].children[0].getAttribute("href"))?(mealList[i].children[0].getAttribute("href")): 'Recipe Link'}">
						  </div>
					</form>`;	
		}
		//Change edit button to "save" and change classes for event listeners
		const editButton = e.target;
		editButton.innerText = "Save";
		editButton.classList.remove("card-day-edit", "disabled", "btn-outline-primary");
		editButton.classList.add("card-day-save","btn-outline-info");	
		editButton.disabled = false;
	}

	saveEdits(e){	
		//target necessary card elements
		const card = e.target.parentElement;
		const mealList = card.querySelectorAll(".card-text");
		const mealInputs = card.querySelectorAll(".input-meal");
		const linkInputs = card.querySelectorAll(".input-link");

		//validates URLs and adds error messages
		let linksValid = this.validateURLs(linkInputs);
		
		//cease function if URL not valid
		if(!linksValid){
			return false;
		}

		//iterate over card-elements and place corresponding meal texts and link attributes
		for(let i = 0; i<3; i++){
			mealList[i].innerHTML = `<a target=_blank class="recipe-link">${mealInputs[i].value}</a>`;
			if(this.is_url(linkInputs[i].value)){
				mealList[i].children[0].setAttribute('href', linkInputs[i].value);
			} 
		}
		//re-enable other edits buttons and change styles accordingly
		const otherButtons = document.querySelectorAll('.card-day-edit');
		otherButtons.forEach(button =>{
			button.classList.remove("disabled");
			button.disabled = false;
		})
		//change save button back to edit button and add corresponding styles
		const saveButton = e.target;
		saveButton.innerText = "Edit";
		saveButton.classList.remove("card-day-save", "btn-outline-info");
		saveButton.classList.add("card-day-edit", "btn-outline-primary");		
	}

	//Verfies that link inserted by user is a proper URL
	//taken from https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php
	is_url(str){
  		const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)){
          return true;
        }
        else{
          return false;
        }
	}
	linkError(link){
		//creates and adds a new div with a new textNode and inserts it under the link element
		const div = document.createElement('div');
		const text = document.createTextNode('Please enter a valid URL or leave this space blank.');
		div.appendChild(text);
		div.classList.add("invalid-feedback");
		//checks for error message and replaces it
		if(link.parentElement.children.length > 1){
			link.parentElement.replaceChild(div,link.parentElement.lastChild);
		} else{
			link.parentElement.appendChild(div);
		}
		return 0;
	}
	validateURLs(linkArray){
		//validatesURL's entered and throws error if not valid	
		let linksValid = true;
		linkArray.forEach(link =>{
			if(link.value !== ''){
				if((!this.is_url(link.value))){
					link.classList.add("is-invalid");
					this.linkError(link);
					linksValid = false;
					return false;
				} else{
					return true
				}
			} 
		});
		return linksValid;
		
	}

}


export const ui = new UI();