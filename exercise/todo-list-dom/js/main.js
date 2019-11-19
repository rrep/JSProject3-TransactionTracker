/*
  Add the required JavaScript to handle form submit and add a new todo item to 
  the page (in the div.todo-list element).  You will need to use a counter to 
  uniquely identify each todo item and use only DOM API functions to interact
  with the document (i.e. create each todo item), DO NOT use innerHTML for this
  exercise.
*/

// required vars
var todos = document.querySelector('.todo-list');
var todoCount = 0;


// todo form submit handler, adds a new todo item to the 'list'
document.querySelector('.todo-frm').addEventListener('submit', function (evt) {
	
	var div,
		checkbox,
		label,
		labelText,
		todoText;

	todoText = evt.target.elements['todo-item'].value;

	// adding a todo regardless, so might as well increment now...
	todoCount += 1;
	
	if (todoText === '') {
		todoText = 'Todo ' + (todoCount);
	}

	// create required elements
	div = document.createElement('div');
	checkbox = document.createElement('input');
	label = document.createElement('label');
	labelText = document.createTextNode(todoText);


	
	// set appropriate attributes
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'todo-' + todoCount);
	label.setAttribute('for', 'todo-' + todoCount);
	label.setAttribute('contenteditable', '');	

	// build document fragment
	label.appendChild(labelText);
	div.appendChild(checkbox);
	div.appendChild(label);

	//create elements for for the arrows
	let dn = "\u21e9"; // Unicode value of down arrow 
	let up = "\u21e7"; // Unicode value of up arrow 

	//arrows added
	upSpan = document.createElement('span');
	dnSpan = document.createElement('span');
	upText = document.createTextNode(up);
	dnText = document.createTextNode(dn);
	upSpan.appendChild(upText);
	dnSpan.appendChild(dnText);
	div.appendChild(dnSpan);
	div.appendChild(upSpan);
	upSpan.setAttribute('class', 'arrow up');
	dnSpan.setAttribute('class', 'arrow dn');
	
	//ASSESSMENT
	let mv = "\u21e8";
	mvSpan = document.createElement('span');
	mvText = document.createTextNode(mv);
	mvSpan.appendChild(mvText);
	div.appendChild(mvSpan);
	mvSpan.setAttribute('class', 'arrow mv');

	// add the document fragment to the document for rendering
	todos.appendChild(div);

	// clear the form
	evt.target.reset();

	evt.preventDefault();
});

document.querySelector('.todo-list').addEventListener('click', function (evt) {  
	let targetTodo = evt.target.parentNode;
	let todoList = targetTodo.parentNode;
	let siblingTodo;

	// check for click on an arrow     
	if (evt.target.classList.contains('arrow')) {         
	// identify the type of arrow (i.e. down or up)         
		if (evt.target.classList.contains('dn')) {             
			siblingTodo = targetTodo.nextElementSibling;
			if (siblingTodo != null)
				todoList.insertBefore(siblingTodo, targetTodo);         
		} else if (evt.target.classList.contains('up')) {             
			siblingTodo = targetTodo.previousElementSibling;
			todoList.insertBefore(targetTodo, siblingTodo);
			//remove portion        
		} else if (evt.target.classList.contains('mv')){
			let remove = confirm('Remove item?');
			if(remove)
				todoList.removeChild(targetTodo);
		}
	} 
});