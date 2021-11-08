// const HOST = "http://localhost:8080" for dev on local
const HOST = "https://egmongodb.herokuapp.com"

const getPhoneBook = async () => {
  const response = await fetch(`${HOST}/api/persons`);
  const responseArrayPerson = await response.json();
  document.getElementById("phonebookTableBody").innerHTML = ""; // reset Table
  for (let personObj of responseArrayPerson) {
    const tr = document.createElement("tr");
    const idTH = document.createElement("th");
    const nameTD = document.createElement("td");
    const numberTD = document.createElement("td");
    idTH.setAttribute("scope", "row");
    idTH.innerText = personObj.id;
    nameTD.innerText = personObj.name;
    numberTD.innerText = personObj.number
    tr.append(idTH, nameTD, numberTD);
    document.getElementById("phonebookTableBody").appendChild(tr);
  }
}
getPhoneBook();

const addPersonToServer = async () => {
  const userNameElem = document.getElementById("validationCustomName");
  const userPhoneNumberElem = document.getElementById("validationCustomPhoneNumber");
  const nameValdElem = document.getElementById("nameValidationText");
  const phoneValdElem = document.getElementById("phoneValidationText");

  if (!validator.isAlpha(userNameElem.value) || !validator.isLength(userNameElem.value, { min: 3, max: 15 })) {
    userNameElem.classList.add("is-invalid")
    nameValdElem.innerText = "Name Not Valid";
    nameValdElem.className = "invalid-feedback";
    return;
  } else {
    userNameElem.classList.remove("is-invalid")
    userNameElem.classList.add("is-valid")
    nameValdElem.innerText = "Good Name";
    nameValdElem.className = "valid-feedback";
  }
  if (!validator.isMobilePhone(userPhoneNumberElem.value)) {
    userPhoneNumberElem.classList.add("is-invalid")
    phoneValdElem.innerText = "Phone Not Valid";
    phoneValdElem.className = "invalid-feedback";
    return;
  } else {
    userPhoneNumberElem.classList.remove("is-invalid")
    userPhoneNumberElem.classList.add("is-valid")
    phoneValdElem.innerText = "Great Phone";
    phoneValdElem.className = "valid-feedback";
  }

  try {
    const response = await fetch(`${HOST}/api/persons`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userNameElem.value,
        number: userPhoneNumberElem.value
      })
    }).then((res) => {
      if (!res.ok) {
        throw new Error("UserNameTaken")
      }
      return res;
    });
    getPhoneBook(); // Update Phonebook
  } catch (err) {
    userNameElem.classList.add("is-invalid")
    nameValdElem.innerText = "Name Taken";
    nameValdElem.className = "invalid-feedback";
  }
}

const getPersonFromPhonebook = async () => {
  const personID = document.getElementById("validationCustomPersonId").value;
  if (!personID) {
    return;
  }
  try {
    const response = await fetch(`${HOST}/api/persons/${personID}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("NO ID IN DB");
      }
      return res;
    }
    );
    const personObj = await response.json();
    document.getElementById("tablePersonData").innerHTML = `
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">${personObj.id}</th>
      <td>${personObj.name}</td>
      <td>${personObj.number}</td>
      <td><button onclick="deletePersonID(${personObj.id})">Delete Person</button></td>
    </tr>
  </tbody>
  `
    document.getElementById("searchValidationText").innerText = "";
  } catch (err) {
    document.getElementById("validationCustomPersonId").classList.add("is-invalid")
    document.getElementById("searchValidationText").innerText = "Person Not In Phonebook";
  }
}

const deletePersonID = async (PersonID) => {
  try {
    const response = await fetch(`${HOST}/api/persons/delete/${PersonID}`, {
      method: "DELETE"
    }).then((res) => {
      if (!res.ok) {
        throw new Error("cant delete");
      }
      return res;
    });
    document.getElementById("tablePersonData").innerHTML = "";
    getPhoneBook();
  } catch (err) {
    console.log(err);
  }
}

//Eventlistners
document.getElementById("getPhonebookBtn").addEventListener("click", getPhoneBook)
document.getElementById("sendServerNewPerson").addEventListener("click", addPersonToServer)
document.getElementById("sendSearchPersonIdBtn").addEventListener("click", getPersonFromPhonebook)