const HOST = "http://localhost:8080"
const getPhoneBook = async () => {
  const response = await fetch(`${HOST}/api/persons`);
  const responseArrayPerson = await response.json();
  document.getElementById("phonebookTableBody").innerHTML = "";
  for (let personObj of responseArrayPerson) {
    const tr = document.createElement("tr");
    const idTH = document.createElement("th");
    const nameTD = document.createElement("td");
    const numberTD = document.createElement("td");
    idTH.setAttribute("scope", "row")
    idTH.innerText = personObj.id;
    nameTD.innerText = personObj.name;
    numberTD.innerText = personObj.number
    tr.append(idTH, nameTD, numberTD);
    document.getElementById("phonebookTableBody").appendChild(tr);
  }
}
getPhoneBook();
document.getElementById("getPhonebookBtn").addEventListener("click", getPhoneBook)