// Enter JavaScript for the exercise here...
const errorLabel = document.querySelector('.error');
const totalDebitSpan = document.querySelector('span.total.debits');
const totalCreditSpan = document.querySelector('span.total.credits');
const transactionTable = document.querySelector('.transactions');

//global variables for totals
var totalDebits=0, 
    totalCredits=0;

//timeout that refreshes the page fter 2 minutes
function refreshPageCountdown(){ 
    setTimeout(() => {
        alert('Page will refresh due to 2 minutes of inactivity.');
        location.reload();
    }, 120000);
}

//BEGIN COUNTDOWN
refreshPageCountdown();

//SUBMIT BUTTON
document.querySelector('.frm-transactions').addEventListener('submit', function (evt) {
    //prevent reload
    evt.preventDefault();

    //reset/begin countdown
    clearTimeout(refreshPageCountdown);
    refreshPageCountdown();

    //if there's already an error message get rid of it
    if(errorLabel.firstChild)
        errorLabel.removeChild(errorLabel.firstChild);

    //retrieve values
    let descriptionInput = evt.target.elements['description'].value;
    let typeInput = evt.target.elements['type'].value;
    let currencyInput = (Number.parseFloat(evt.target.elements['currency'].value)||0).toFixed(2);


   
    //validate form input
    if (!descriptionInput || (currencyInput<=0) || (typeInput != 'credit' && typeInput !=  'debit')){
        let errorMessages = document.createElement('p');
        let firstMessage = document.createTextNode("Please correct the following errors:");
        let errorList = document.createElement('ul');
        errorMessages.appendChild(firstMessage);
        errorMessages.appendChild(errorList);
        errorLabel.appendChild(errorMessages);
        //add error messaged based on missed validation
        if (!descriptionInput){
            let descriptionErrorItem = document.createElement('li');
            let descriptionErrorMessage = document.createTextNode("Please include a description.")
            descriptionErrorItem.appendChild(descriptionErrorMessage);
            errorList.appendChild(descriptionErrorItem);
        }
        if (typeInput != 'credit' && typeInput !=  'debit'){
            let amountErrorItem = document.createElement('li');
            let amountErrorMessage = document.createTextNode("Please select debit or credit.")
            amountErrorItem.appendChild(amountErrorMessage);
            errorList.appendChild(amountErrorItem);
        }
        if (currencyInput<=0){
            let currencyErrorItem = document.createElement('li');
            let currencyErrorMessage = document.createTextNode("Amount must be positive.")
            currencyErrorItem.appendChild(currencyErrorMessage);
            errorList.appendChild(currencyErrorItem);
        }
    } else { //run code if pass validation
        //increment total debits or total credits
        switch(typeInput){
            case "credit":
                totalCredits = Number.parseFloat(totalCredits) + Number.parseFloat(currencyInput);
                totalCreditSpan.removeChild(totalCreditSpan.firstChild);
                let newCreditTotal = document.createTextNode("$"+totalCredits.toFixed(2));
                totalCreditSpan.appendChild(newCreditTotal);
                break
            case "debit":
                totalDebits = Number.parseFloat(totalDebits) + Number.parseFloat(currencyInput);;
                totalDebitSpan.removeChild(totalDebitSpan.firstChild);
                let newDebitTotal = document.createTextNode("$"+totalDebits.toFixed(2));
                totalDebitSpan.appendChild(newDebitTotal);
                break;
        }
        totalCreditSpan.childNodes[0].value = "$" + totalCredits;

        //create variables for new line item
        let newRow,
            descriptionCell,
            typeCell,
            amountCell,
            toolsCell,
            deleteIcon,
            descriptionText,
            typeText,
            amountText;
      
        //create new elements
        newRow = document.createElement('tr');
        descriptionCell = document.createElement('td');
        typeCell = document.createElement('td');
        amountCell = document.createElement('td');
        toolsCell = document.createElement('td');
        deleteIcon = document.createElement('i');

        //create new textnodes
        descriptionText = document.createTextNode(descriptionInput);
        typeText = document.createTextNode(typeInput);
        amountText = document.createTextNode("$"+currencyInput);
        
        //fill in new elements
        descriptionCell.appendChild(descriptionText);
        typeCell.appendChild(typeText);
        amountCell.appendChild(amountText);
        toolsCell.appendChild(deleteIcon);

        //create row
        newRow.appendChild(descriptionCell);
        newRow.appendChild(typeCell);
        newRow.appendChild(amountCell);
        newRow.appendChild(toolsCell);
        
        //set attributes
        newRow.setAttribute('class',typeInput);
        amountCell.setAttribute('class','amount');
        toolsCell.setAttribute('class','tools');
        deleteIcon.setAttribute('class','delete fa fa-trash-o')        

        //add entered transaction to the transaction table
        transactionTable.appendChild(newRow);

        //clear form
        evt.target.reset();
    }
});

//DELETE BUTTON
transactionTable.addEventListener('click', function (evt) {
    //reset countdown
    clearTimeout(refreshPageCountdown);
    refreshPageCountdown();
    //select row
	let targetTransaction = evt.target.parentNode.parentNode;
    //delete logic
    if (evt.target.classList.contains('delete')) { 
        //confirm popup        
		let remove = confirm('Remove item?');
        //user confirms
        if(remove) {
            //grab amount
            let removeAmountCell = targetTransaction.querySelector('td.amount');
            let removedAmount = removeAmountCell.innerText.slice(1,removeAmountCell.innerText.length);
            //grab type
            let removedType = targetTransaction.classList[0];
            //remove item
            transactionTable.removeChild(targetTransaction);
            //decrement total amounts based on type
            switch(removedType){
                case "credit":
                    totalCredits = Number.parseFloat(totalCredits) - Number.parseFloat(removedAmount);
                    totalCreditSpan.removeChild(totalCreditSpan.firstChild);
                    let newCreditTotal = document.createTextNode("$"+totalCredits.toFixed(2));
                    totalCreditSpan.appendChild(newCreditTotal);
                    break
                case "debit":
                    totalDebits = Number.parseFloat(totalDebits) - Number.parseFloat(removedAmount);;
                    totalDebitSpan.removeChild(totalDebitSpan.firstChild);
                    let newDebitTotal = document.createTextNode("$"+totalDebits.toFixed(2));
                    totalDebitSpan.appendChild(newDebitTotal);
                    break;
            }
        }
    }
});

