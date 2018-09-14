class ShoppingList {
	constructor(){
		this.shoppingList = document.querySelector(".shopping-list-start");

	}
	//add items from input or from recipes in form of an array of items
	addItems(itemList){
		let html = '';
		//get html of current list
		html = this.shoppingList.innerHTML;
		//generate html for each item in array
		itemList.forEach(function(item){
			if(item !== ''){
				html+= `<li class="list-group-item border-info">${item}<button type="button" class="close" aria-label="Close"><span class="close-x" aria-hidden="true">&times;</span></button></li>`
			}
		});
		//add it to current html and add it back into the DOM
		this.shoppingList.innerHTML = html;
	}
	editState(e){
		const listButtons = e.target.parentElement;
		const listContainer = e.target.parentElement.parentElement;

		const div = document.createElement('div');
		div.classList.add("form-group", "mt-2");
		div.innerHTML = `<textarea class="form-control" rows="2" placeholder="Enter items separated by commas i.e. Rice, Chicken, Bay Leaves"></textarea>`;
		listContainer.insertBefore(div, listButtons);
		console.log(e.target.parentElement.parentElement);
	}
	//clears item clicked
	clearItem(e){
		this.shoppingList.removeChild(e.target.parentElement.parentElement);
	}
	//clears all items on shopping list
	clearList(){
		this.shoppingList.innerHTML = '';
	}
}

export const shoppingList = new ShoppingList();