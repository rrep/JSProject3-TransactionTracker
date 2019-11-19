// Enter JavaScript for the exercise here...
const errorLabel = document.querySelector('.error');

document.querySelector('.frm-transactions').addEventListener('submit', function (evt) {
   //validate form input (description.NotBlank, type = (credit || debit), currency > 0)
    evt.preventDefault();
    let descriptionInput = evt.target.elements['description'].value;
    let typeInput = evt.target.elements['type'].value;
    let currencyInput = Number.parseFloat(evt.target.elements['currency'].value).toFixed(2);
    
    if (!descriptionInput || (typeInput != ("credit" || "debit")) || currencyInput<0){
        let errorMessages = "Please correct the following errors: <ul>";
        //Form Validation - Displays proper message for invalid values 
        if (!descriptionInput){
            errorMessages += "<li>Please include a description.</li> "
        }
        if (typeInput != ("credit" || "debit")){
            errorMessages += "<li>Please choose either debit or credit.</li> "
        }
        if (currencyInput<0){
            errorMessages += "<li>Please enter a positive amount.</li> "
        }
        errorLabel.innerHTML = errorMessages + currencyInput +"</ul>";
    } else {

    var newRow,
        descriptionCell,
        amountCell,
        toolsCell,
        deleteIcon;
        

    //add entered transaction to the transaction table (display $ and two decimal places use .toFixed())
    console.log(descriptionInput)
    }
    });

//track total of each type of transaction

//delete transactions (requires a popup)

//timeout that refreshes the page fter 2 minutes