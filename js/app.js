function changeContent () {
	
	function Contact( firstName, lastName, email, phone, address, city) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = [phone];
		this.address = address;
		this.city = city;
	}

	var counterPhone =1
	var newPhonesArray = []

	$("#contact-form").on("click", "#addPhoneButton", function (event){
		event.preventDefault()
		counterPhone ++
		console.log(counterPhone)
		var uniqueId = "'" + "phone" + counterPhone + "'"
		var newPhoneInput = $("<input name='new_field' id=" + uniqueId + " type='text' class='form-control' placeholder='Please enter phone'>");
		if (counterPhone === 2){
			$("#form_phone").after(newPhoneInput);
		}
		else{
			$("#phone" + (counterPhone - 1)).after(newPhoneInput);
		}
		var newPhone = document.getElementById("phone" + counterPhone).value
		// var newPhone = document.getElementById("uniqueId").value
		console.log(newPhone)
		newPhonesArray.push(newPhone)
		console.log(newPhonesArray)

	});


	//<--* Array for newly added contacts *-->

	var contactArray = []
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
		var formAddress = document.getElementById("form_streetAddress").value;
		var formCity = document.getElementById("form_city").value;
		
		if(formName != "" && formLast != "" && formEmail !=""){
			//<--* variable to create a new contact object *-->

			var newContact = new Contact(formName, formLast, formEmail, formPhone, formAddress, formCity);
			// console.log("yiss", newContact)
			var allPhones = newContact.formPhone.concat(newPhonesArray)
			
			// newContact.formPhone.concat(newPhonesArray)
			console.log("new phones", allPhones)
			
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
		document.getElementById("phoneInfo").innerHTML = contactArray[event.target.id].phone
		document.getElementById("addressInfo").innerHTML = contactArray[event.target.id].address
		document.getElementById("cityInfo").innerHTML = contactArray[event.target.id].city

	});


}

window.onload = changeContent 





