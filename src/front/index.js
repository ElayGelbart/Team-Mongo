import * as dom from './DOM';

document.body.style.backgroundColor = 'cornsilk';
const baseURL = 'https://localhost:3001';
// const baseURL = 'https://ehood-phonebook.herokuapp.com/api/persons';

/**
 * Fetches phonebook data from server and displays it.
 */
async function getPhonebook(){
    try{
        const response = await axios.get(`${baseURL}`);
        const phonebook = response.data;
        dom.displayPhonebook(phonebook);
    }
    catch(error){
        console.log(error.response.data);
    }
}

/**
 * Uses the search field to search for a person. Will display person info if exists.
 */
async function searchPerson(){
    const searchId = document.querySelector('#search_id').value;
    if(!searchId) return;
    try{
        const response = await axios.get(`${baseURL}/${searchId}`);
        const foundPerson = response.data
        dom.displayFoundPerson(foundPerson);
    }
    catch(error){
        dom.displayError(error.response.data.error, 'search');
    }
}

/**
 * Adds a new person to the phonebook if the needed info fields are non-empty.
 */
async function addPerson(){
    const addPersonValues = addPersonCheck();
    if(addPersonValues === 'missing') return;
    const { id, name, number } = addPersonValues;
    try{
        const response = await axios.post(baseURL, { id, name, number });
        dom.displayPhonebook(response.data);
    }
    catch(error){
        dom.displayError(error.response.data.error, 'add');
    }
}

/**
 * Deletes a person from the phonebook if it exists.
 */
async function deletePerson(){
    const deleteId = document.querySelector('#delete_id').value;
    if(!deleteId) return;
    try{
       const response = await axios.delete(`${baseURL}/${deleteId}`);
       const updatedPhonebook = response.data
       dom.displayPhonebook(updatedPhonebook);
    }
    catch(error){
        dom.displayError(error.response.data.error, 'delete');
    }
}

/**
 * Checks if all the new person fields are non-empty. Returns a new person object if so.
 * @returns {Object} - A new person object.
 */
function addPersonCheck(){
    const addPersonFields = document.querySelectorAll('.new_person');
    for(let field of addPersonFields){
        if(!field.value){
            dom.displayError('Please fill every field.', 'add');
            return 'missing';
        }
    }
    return {
        name: addPersonFields[0].value,
        number: addPersonFields[1].value
    };
}

getPhonebook();
document.querySelector('#search_btn').addEventListener('click', searchPerson)
document.querySelector('#submit_btn').addEventListener('click', addPerson)
document.querySelector('#delete_btn').addEventListener('click', deletePerson);
