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
						    <p class="card-text"><a href="www.allrecipes.com" class="recipe-link ">Avocado Toast with Eggs</a></p>
						    <h6 class="card-subtitle text-muted">Lunch</h6>
						    <p class="card-text"><a class="recipe-link ">Chicken Cutlet with Broccoli Rabe</a></p><h6 class="card-subtitle text-muted">Dinner</h6>
						    <p class="card-text"><a class="recipe-link">Recipe Title</a></p>
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
		//re-enable other edits buttons and change styles accordingly
		const otherButtons = document.querySelectorAll('.card-day-edit');
		otherButtons.forEach(button =>{
			button.classList.remove("disabled");
			button.disabled = false;
		})		
		//target necessary card elements
		const card = e.target.parentElement;
		const mealList = card.querySelectorAll(".card-text");
		const mealInputs = card.querySelectorAll(".input-meal");
		const linkInputs = card.querySelectorAll(".input-link");
		//iterate over card-elements and place corresponding meal texts and link attributes
		for(let i = 0; i<3; i++){
			mealList[i].innerHTML = `<a href="" target=_blank class="recipe-link">${mealInputs[i].value}</a>`
			if(linkInputs[i].value !== '' && linkInputs[i].value !=='Recipe Link'){
				mealList[i].setAttribute('href', linkInputs[i].value)
			}

		}
		//change save button back to edit button and add corresponding styles
		const saveButton = e.target;
		saveButton.innerText = "Edit";
		saveButton.classList.remove("card-day-save", "btn-outline-info");
		saveButton.classList.add("card-day-edit", "btn-outline-primary");
		

	}


}

export const ui = new UI();