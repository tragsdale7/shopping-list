let itemInput = document.getElementById('item-input');
let itemSubmit = document.getElementById('submitInput');
let itemsContainer = document.getElementById('d');
let deleteDiv = document.getElementsByClassName('itemDelete');
let checkDiv = document.getElementsByClassName('itemFinish');
let itemsList = document.getElementsByClassName('item');
let itemsTracker = [];


itemSubmit.addEventListener('click', work);

document.addEventListener('keyup', function(e){
	if(e.keyCode === 13) {
		work();		
	}
});


function work() {

	//remove focus on input element to prevent double submits when enter pressed
	itemSubmit.blur();

	let trimInput = itemInput.value.replace(/\s/g, '');

	//check that at least one character was entered
	if(trimInput.length > 0) {

		// store input into variable
		let itemValue = itemInput.value;

		//check if shopping item already exists and update count if so
		for(let i = 0; i < itemsTracker.length; i++) {
			
			if(itemsTracker[i].name === itemValue) {
				
				itemsTracker[i].count++
				for(let y = 0; y < itemsList.length; y++) {
					
					if(itemsList[y].firstChild.textContent === itemsTracker[i].name) {
						

						itemsList[y].children[1].textContent = `(${itemsTracker[i].count})`;
					}
				}
				//reset input field to empty string
				itemInput.value = "";

				return;
			}
		};

		let item = {
			name: itemValue,
			count: 1
		};

		itemsTracker.push(item);

		//create div with class of item
		let newItemDiv = document.createElement('div');
		newItemDiv.className = 'item';

		//create div with class of itemName and add input to textcontent
		let newItemNameDiv = document.createElement('div');
		newItemNameDiv.className = 'itemName';
		newItemNameDiv.textContent = itemValue;

		//create div with class of count and add count to textcontent
		let newItemCount = document.createElement('div');
		newItemCount.className = 'count';
		newItemCount.textContent = `(${item.count})`;

		// create div with class of edit
		let newEditDiv = document.createElement('div');
		newEditDiv.className = 'edit';

		// create div with class of itemFinish
		let newItemFinish = document.createElement('div');
		newItemFinish.className = 'itemFinish';

		// create i tag with class of 'fas fa-check'
		let newCheckIcon = document.createElement('i');
		newCheckIcon.className = 'fas fa-check';

		// create div with class of itemDelete
		let newDeleteDiv = document.createElement('div');
		newDeleteDiv.className = 'itemDelete';
		newDeleteDiv.textContent = 'X';

		// append child divs to the top parent id=d div
		itemsContainer.appendChild(newItemDiv);

		newItemDiv.appendChild(newItemNameDiv);
		newItemDiv.appendChild(newItemCount);
		newItemDiv.appendChild(newEditDiv);

		newEditDiv.appendChild(newItemFinish);
		newEditDiv.appendChild(newDeleteDiv);
		newItemFinish.appendChild(newCheckIcon);

		// add event listener to delete div
		newDeleteDiv.addEventListener('click', function(e){
			let item = e.currentTarget.parentNode.parentNode.firstChild.textContent;

				for(let x = 0; x < itemsTracker.length; x++) {
					if(item === itemsTracker[x].name) {
						itemsTracker.splice(x, 1);
						console.log(itemsTracker);
					}
				}

			e.currentTarget.parentNode.parentNode.remove();
		}, false);	

		// add event listener to check div
		newItemFinish.addEventListener('click', function(e){
			e.currentTarget.parentNode.parentNode.classList.toggle('check');
		}, false);

		//reset input field to empty string
		itemInput.value = "";
		
	} else {

		alert('Please enter an item!');
	}
}