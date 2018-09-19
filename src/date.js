class DateCalc{
	constructor(){
		this.date = document.querySelector(".date-input");

	}

 	getDateInput(){
		this.date = document.querySelector(".date-input");
		//Check if date is empty(HTML verifies by returning empty string for false dates)
		if(this.date.value !== ''){
			//checks for error message and removes it
			this.removeError();
			// split input into array
			let dateArray = this.date.value.split("-");
			//make a new date object
			let startDate = new Date();
			//set month (adding 1 due to month array starting at 0)
			startDate.setMonth(dateArray[1] - 1);
			startDate.setDate(dateArray[2]);
			let userDate = this.getWeekArray(startDate);
			return userDate;
		} else{
			this.dateError();
			return false;
		}
		// test
		//console.log(dateArray, startDate);
	}


	//enter start date, default is today, based on user input
 	getWeekArray(startDate){
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

	removeError(){
		if(this.date.nextSibling.nextSibling){
			this.date.nextSibling.nextSibling.parentElement.removeChild(this.date.nextSibling.nextSibling);
		}
	}

	dateError(){
		//creates and adds a new div with a new textNode and inserts it under the date input
		const div = document.createElement('div');
		const text = document.createTextNode('Please enter a valid date.');
		div.appendChild(text);
		this.date.classList.add("is-invalid");
		div.classList.add("invalid-feedback");
		//checks for error message and replaces it
		this.removeError();
		this.date.parentElement.appendChild(div);		
	}
}

export const dateCalc = new DateCalc();