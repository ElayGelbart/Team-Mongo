
const getDataFromServer = async () => {
    try{
    const response = await axios.get("http://localhost:3001/api/persons");
    const data = response.data;
    createTable(data);
    } catch(error) {
       alert(error);
    }
}

const createTable = (personsArr) => {
    const tableBody = document.querySelector("#phoneBookBody");
// creating all cells
for (var i = 0; i < personsArr.length; i++) {
    // creates a table row
    const personRow = document.createElement("tr");     // creates a person row
        personRow.appendChild(createTd(personsArr[i].name))     // appends to the person row a person name td element
        personRow.appendChild(createTd(personsArr[i].number))      // appends to the person row a person number td element
        personRow.appendChild(createTdButton(personsArr[i].id)) 
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

// creates cell td and cellText and assign person name or number
const createTdButton = (personId) => {
    const cell = document.createElement("td");
    const cellBtn = document.createElement("button");
    cellBtn.textContent = "Delete";
    cellBtn.setAttribute("onclick", `deletePersonfromDataBase(${personId})`)
    cell.appendChild(cellBtn);
    return cell;
}


getDataFromServer();
