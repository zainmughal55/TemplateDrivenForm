import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./customStyleSheet.css']
})
export class AppComponent {

	MethodSwaping="Submit";// swaping update and submit method for single button

	contactList=[]; // use to store contacts in array
	
	//check use as a flag to check old record
	check:number= (JSON.parse(localStorage.getItem("checkerValue")) != null) ? 1 : 0;

	selectedIndex:number = 0; // In edit method it use to capture the selected index

	public LoadData()
	{
		this.contactList = JSON.parse(localStorage.getItem("Contacts"));
	}

	public Submit(value,userForm)
	{
		this.contactList.push(value);

		//reset form values to null
		userForm.reset();
		
		//store array values in local storage
		localStorage.setItem('Contacts', JSON.stringify(this.contactList));

		this.check = 1;

		localStorage.setItem('checkerValue', JSON.stringify(this.check));
	}
	public Edit(i,userForm)
	{
		this.selectedIndex=i;

		//set values from selected index values to form
		userForm.setValue({
			name: this.contactList[i].name,
			email: this.contactList[i].email,
			phone: this.contactList[i].phone});

		this.MethodSwaping="Update";
	}
	public Update(value,userForm)
	{
		this.contactList[this.selectedIndex].name=value.name;
		this.contactList[this.selectedIndex].email=value.email;
		this.contactList[this.selectedIndex].phone=value.phone;

		localStorage.setItem('Contacts', JSON.stringify(this.contactList));

		this.MethodSwaping="Submit";
		
		userForm.reset();
	}
}
