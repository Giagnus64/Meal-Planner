// import {http} from "./easyhttp3"

class Recipe {
	constructor(){
		this.APIkey = "5f71f01a77a1fab1f3ff3a9eeb61fc10";
		this.search = "rice";
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
		this.get(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${this.APIkey}&q=${this.search}`)
		.then(results => {
		console.log(results);
		list = this.copyRecipes(results.recipes);
		return list;
		console.log(results);	
		})
		.catch(err =>console.log(err));
	}

	copyRecipes(recipeArray){
		const recipeList = Array.from(recipeArray);
		console.log(recipeList);
	}

	searchRecipesByID(){
		
	}
}
export const recipe = new Recipe();