const NAME = "name"
const PROFESSION = "profession"
const AGE = "age"
const SUCCESS_MSG = "success-msg"
const ERROR_MSG = "error-msg"
const NO_EMPLOYEE_MSG = "no-employee-msg"
const EMPLOYEES_LIST = "employees-list"

employees = []
insertCount = 0

class Employee {
	constructor(id, name, profession, age) {
		this.id = id
		this.name = name
		this.profession = profession
		this.age = age
	}
}

function isValidInput(name, profession, age) {
	if (name == "" || profession == "" || age == "") return false
	return true
}

function hideElement(id) {
	document.getElementById(id).style.display = "none"
}

function showElement(id) {
	document.getElementById(id).style.display = "block"
}

function showError() {
	hideElement(SUCCESS_MSG)
	showElement(ERROR_MSG)
}

function showSuccess() {
	hideElement(ERROR_MSG)
	showElement(SUCCESS_MSG)
}

function clearMsg() {
	clearInput()
	hideElement(SUCCESS_MSG)
	hideElement(ERROR_MSG)
}

function generateEmployeesTable() {
	tableHtml = ''
	for (let i = 0; i < employees.length; i++) {
		tableHtml += '<div class="row">' +
							'<div class="col-sm-8 employee-item">' +
								'<div class="container">' +
									'<div class="row">' +
										'<div class="col-sm-1"><p>' + employees[i].id + '.</p></div>' +
										'<div class="col-sm-4"><p>Name: ' + employees[i].name + '</p></div>' +
										'<div class="col-sm-5"><p>Profession: ' + employees[i].profession + '</p></div>' +
										'<div class="col-sm-2"><p>Age: ' + employees[i].age + '</p></div>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="col-sm-4 delete-btn">' +
								'<a class="btn btn-default" onclick="deleteEmployee(' + i + ')">Delete User</a>' +
							'</div>' +
						'</div>'
	}
	document.getElementById(EMPLOYEES_LIST).innerHTML = tableHtml
}

function showEmployees() {
	if (employees.length == 0) {
		showElement(NO_EMPLOYEE_MSG)
		hideElement(EMPLOYEES_LIST)
		return
	}

	generateEmployeesTable()
	hideElement(NO_EMPLOYEE_MSG)
	showElement(EMPLOYEES_LIST)	
}

function deleteEmployee(index) {
	employees.splice(index, 1)
	clearMsg()
	showEmployees()
}

function readInputField(fieldName) {
	return document.getElementById(fieldName).value.trim()
}

function clearInputField(fieldName) {
	document.getElementById(fieldName).value = ""
}

function readInput() {
	name = readInputField(NAME)
	profession = readInputField(PROFESSION)
	age = readInputField(AGE)

	return {NAME: name, PROFESSION: profession, AGE: age}
}

function clearInput() {
	clearInputField(NAME)
	clearInputField(PROFESSION)
	clearInputField(AGE)
}

function addEmployee() {
	var input = readInput()

	var name = input.NAME
	var profession = input.PROFESSION
	var age = input.AGE
	
	if (!isValidInput(name, profession, age)) {
		showError()
		return
	}

	employees.push(new Employee(++insertCount, name, profession, parseInt(age)))

	clearInput()
	showSuccess()
	showEmployees()
}


function checkIfNumber(event) {
   const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/); // (this line taken from stack overflow because the age field was not working for mozilla alone so, solved the issue.)
   return !event.key.match(regex) && event.preventDefault();
}