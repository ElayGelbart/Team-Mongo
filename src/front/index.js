// import "./style.css";
// import * as dom from './DOM';
// import { displayPhonebook } from "./DOM";
document.body.style.backgroundColor = 'cornsilk';
const baseURL = 'http://localhost:3001/api/persons';
async function getPhonebook(){
    try{
        const response = await axios.get(`${baseURL}`);
        const phonebook = response.data;
        displayPhonebook(phonebook);
    }
    catch(error){
        console.log(error.response.data);
    }
}
getPhonebook();

document.querySelector('#search_btn').addEventListener('click', searchPerson)
document.querySelector('#submit_btn').addEventListener('click', addPerson)

function searchPerson(){

}

async function addPerson(){
    const addPersonValues = addPersonCheck();
    if(addPersonValues === 'missing') return;
    const { id, name, number } = addPersonValues;
    try{
        const response = await axios.post(baseURL, { id, name, number });
        displayPhonebook(response.data);
    }
    catch(error){
        displayAddPersonError(error.response.data.error);
    }
}

/**
 * Checks if all the new person fields are non-empty. Returns a new person object if so.
 * @returns {Object} - A new person object.
 */
function addPersonCheck(){
    const addPersonFields = document.querySelectorAll('.new_person');
    const addPersonValues = [];
    for(let field of addPersonFields){
        addPersonValues.push(field.value);
    }
    if(!addPersonValues.every(value => value !== '')){
        displayAddPersonError('Please fill every field.');    
        return 'missing';
    }
    return {
        id: addPersonValues[0],
        name: addPersonValues[1],
        number: addPersonValues[2]
    };
}

////////////DOM//////////////////////
/**
 * Displays missing info message.
 */
function displayAddPersonError(message){
    const addPersonResult = document.querySelector('#new_result');
    addPersonResult.innerText = message;
    setTimeout(()=>{
        addPersonResult.innerText = '';
    }, 3000);
}
/**
 * Displays all entries in the phonebook table.
 * @param {Array} phonebook - All entries saved in the phonebook
 */
function displayPhonebook(phonebook){
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

function emptyPhonebookDisplay(){
    const phonebook = document.querySelector('#phonebook');
    const phonebookEntries = document.querySelectorAll('.phonebook_entry');
    for(let entry of phonebookEntries){
        phonebook.removeChild(entry);
    }
}

