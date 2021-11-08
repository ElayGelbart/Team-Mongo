// import "./style.css";
// import * as dom from './DOM';
// import { displayPhonebook } from "./DOM";
const baseURL = 'http://localhost:3001/api/persons';
async function getPhonebook(){
    try{
        const response = await axios.get(`${baseURL}`);
        const phonebook = response.data;
        displayPhonebook(phonebook);
    }
    catch(error){
        alert(error.response.data);
    }
}
getPhonebook();

/**
 * Displays all entries in the phonebook table
 * @param {Array} phonebook - All entries saved in the phonebook
 */
function displayPhonebook(phonebook){
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
