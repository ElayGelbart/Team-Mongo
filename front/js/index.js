
const getDataFromServer = async () => {
    try{
    const response = await axios.get("https://fierce-earth-06756.herokuapp.com/api/persons");
    const data = response.data;
    createTable(data);
    } catch(error) {
        console.log(error);
    }
}

const createTable = (personsArr) => {
    console.log(personsArr);
    const tableBody = document.querySelector("#phoneBookBody");
// creating all cells
for (var i = 0; i < personsArr.length; i++) {
    // creates a table row
    const personRow = document.createElement("tr");     // creates a person row
        personRow.appendChild(createTd(personsArr[i].name))     // appends to the person row a person name td element
        personRow.appendChild(createTd(personsArr[i].number))      // appends to the person row a person number td element
        personRow.appendChild(createBtn(personsArr[i].id))      // appends to the person row a person number td element
    // add the row to the end of the table body
    tableBody.appendChild(personRow);
  }
}

// creates cell td and cellText and assign person name or number
const createTd = (personData) => {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(personData);
    cell.appendChild(cellText);
    return cell;
}

const createBtn = (personId) => {
    const cell = document.createElement("button");
    cell.textContent = "Delete";
    cell.addEventListener("click", deletePerson(personId));
    return cell;
}

const deletePerson = async (personId) => {
    const response = await axios.delete(`https://fierce-earth-06756.herokuapp.com/api/persons/:${personId}`)

}

getDataFromServer();
