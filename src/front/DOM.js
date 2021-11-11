/**
 * Displays all entries in the phonebook table.
 * @param {Array} phonebook - All entries saved in the phonebook
 */
 export function displayPhonebook(phonebook){
     if(typeof(phonebook) !== 'object') return;
    emptyPhonebookDisplay();
    const phonebookTable = document.querySelector('#phonebook');
    for(let entry of phonebook){
        const entryRow = document.createElement('tr');
        entryRow.classList.add('phonebook_entry');

        const { id, name, number } = entry;
        const entryInfo = [id, name, number];
        entryInfo.forEach(infoValue => {
            const info = document.createElement('td');
            info.innerText = infoValue;
            entryRow.appendChild(info);
        });
        phonebookTable.appendChild(entryRow);
    }
}

/**
 * Removes all existing entries from display.
 */
export function emptyPhonebookDisplay(){
    const phonebook = document.querySelector('#phonebook');
    const phonebookEntries = document.querySelectorAll('.phonebook_entry');
    for(let entry of phonebookEntries){
        phonebook.removeChild(entry);
    }
}

/**
 * Displays found person information in the result field.
 * @param {Object} person 
 */
export function displayFoundPerson(person){
    const { id, name, number } = person;
    const searchResult = document.querySelector('#search_result');
    searchResult.style.visibility = 'visible';
    searchResult.innerText = 
    `ID: ${id}
     Name: ${name}
     Number: ${number}`;
}

/**
 * Displays an error for 3 seconds in one of the result fields.
 * @param {string} message - Error message to display.
 * @param {string} field - Which one of the result fields.
 */
export function displayError(message, field){
    let errorField;
    switch (field) {
        case 'add':
            errorField = document.querySelector('#new_result')
            break;
        case 'search':
            errorField = document.querySelector('#search_result')
            break;
        case 'delete':
            errorField = document.querySelector('#delete_result')
            break;
        default:
            return;
    }
    errorField.style.visibility = "visible";
    errorField.innerText = message;
    setTimeout(()=>{
        errorField.innerText = '';
        errorField.style.visibility = "hidden";
    }, 3000);
}
