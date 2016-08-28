function changeContent () {
	
	function Contact( firstName, lastName, email, phonesArray, addressArray, cityArray) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phonesArray;
		this.address = addressArray;
		this.city = cityArray;
	}

	var counterPhone =1

	$("#contact-form").on("click", "#addPhoneButton", function (event){
		event.preventDefault()
		counterPhone ++
		console.log(counterPhone)
		var uniqueId = "'" + "phone" + counterPhone + "'"
		var newPhoneInput = $("<input name='new_field' id=" + uniqueId + " type='text' class='form-control' placeholder='Please enter phone'>");
		console.log(newPhoneInput)
		if (counterPhone === 2){
			$("#form_phone").after(newPhoneInput);
		}
		else{
			$("#phone" + (counterPhone - 1)).after(newPhoneInput);
		}

	});

	var counterStreet = 1
	var counterCity = 1

	$("#contact-form").on("click", "#addAddressButton", function (event){
		event.preventDefault()
		counterStreet ++
		counterCity ++
		console.log(counterStreet)
		console.log(counterCity)
		var uniqueIdStreet = "'" + "streetAddress" + counterStreet + "'"
		var uniqueIdCity = "'" + "city" + counterCity + "'"
		var newStreetInput = $("<input name='new_street_field' id=" + uniqueIdStreet + " type='text' class='form-control' placeholder='Please enter your street address'>");
		console.log(newStreetInput)
		var newCityInput = $("<input name='new_city_field' id=" + uniqueIdCity + " type='text' class='form-control' placeholder='Please enter your city'>");

		if (counterStreet === 2 && counterCity === 2){
			$("#form_streetAddress").after(newStreetInput);
			$("#form_city").after(newCityInput);
		}
		else{
			$("#streetAddress" + (counterStreet - 1)).after(newStreetInput);
			$("#city" + (counterCity - 1)).after(newCityInput);
		}

	});



	//<--* Array for newly added contacts *-->

	var contactArray = []
	var newPhonesArray = []
	var newStreetArray = []
	var newCityArray = []
	var counter = 0

	//<--* Function that adds new contacts *-->

	document.getElementById("addButton").onclick = function (event) {
		event.preventDefault()
		//<--* to obtain the input value entered by user *-->

		var formName = document.getElementById("form_name").value;
		console.log(formName)
		var formLast = document.getElementById("form_lastName").value;
		var formEmail = document.getElementById("form_email").value;
		var formPhone = document.getElementById("form_phone").value;
		newPhonesArray.push(formPhone)
		var formAddress = document.getElementById("form_streetAddress").value;
		newStreetArray.push(formAddress)
		var formCity = document.getElementById("form_city").value;
		newCityArray.push(formCity)

		for(var i=2; i<=counterPhone; i++){
			var newPhone = document.getElementById("phone" + i).value
			newPhonesArray.push(newPhone)
		}

		for(var i=2; i<=counterStreet; i++){
			var newStreet = document.getElementById("streetAddress" + i).value
			newStreetArray.push(newStreet)
		}


		for(var i=2; i<=counterCity; i++){
			var newCity = document.getElementById("city" + i).value
			newCityArray.push(newCity)
		}
		
		if(formName != "" && formLast != "" && formEmail !=""){
			//<--* variable to create a new contact object *-->

			var newContact = new Contact(formName, formLast, formEmail, newPhonesArray, newStreetArray, newCityArray);
			// console.log("yiss", newContact)
			
			contactArray.push(newContact)
			console.log(contactArray)

			$("#contactContainer").append("<li>" + "<a id='"+ counter +"'>" + newContact.firstName + " " + newContact.lastName + "</a>" + "</li>")
			counter++

			document.getElementById("form_name").value = "";
			document.getElementById("form_lastName").value="";
			document.getElementById("form_email").value="";
			document.getElementById("form_phone").value="";
			document.getElementById("form_streetAddress").value="";
			document.getElementById("form_city").value="";

			for(var i=2; i<=counterPhone; i++){
				$("#phone" + i).remove();
			}

			counterPhone = 1
			newPhonesArray = []

			for(var i=2; i<=counterStreet; i++){
				$("#streetAddress" + i).remove();
			}

			counterStreet = 1
			newStreetArray = []

			for(var i=2; i<=counterCity; i++){
				$("#city" + i).remove();
			}

			counterCity = 1
			newCityArray = []

		}

		else{
			alert("Please enter a valid name, surname and email")
		}

		

	}

	//<--* Function to see contact details upon clicking their name link *-->

	$("#contactContainer").on("click", "a",function(event){
		event.preventDefault
		console.log("ID OF ELEMENT CLICKED:" ,event.target.id)
		document.getElementById("nameInfo").innerHTML = contactArray[event.target.id].firstName + " " + contactArray[event.target.id].lastName
		document.getElementById("emailInfo").innerHTML = contactArray[event.target.id].email
		document.getElementById("phoneInfo").innerHTML = "<b>" + "Phones" + "</b>" + "<br/><br/>" + contactArray[event.target.id].phone.join("<br/><br/>")
		document.getElementById("addressInfo").innerHTML = "<b>" + "Addresses" + "</b>" + "<br/><br/>" + contactArray[event.target.id].address.map(function(item,index){return item + ", " + contactArray[event.target.id].city[index] }).join("<br/><br/>") 
		
	});


}

window.onload = changeContent 





