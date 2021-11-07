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

const addPersonToServer = async () => {
  const userNameValue = document.getElementById("validationCustomName").value;
  const userPhoneNumberValue = document.getElementById("validationCustomPhoneNumber").value;
  if (!validator.isAlpha(userNameValue) || !validator.isLength(userNameValue, { min: 3, max: 15 })) {
    document.getElementById("validationCustomName").classList.add("is-invalid")
    document.getElementById("nameValidationText").innerText = "Name Not Valid";
    document.getElementById("nameValidationText").className = "invalid-feedback";
    return;
  } else {
    document.getElementById("validationCustomName").classList.remove("is-invalid")
    document.getElementById("validationCustomName").classList.add("is-valid")
    document.getElementById("nameValidationText").innerText = "Good Name";
    document.getElementById("nameValidationText").className = "valid-feedback";
  }
  if (!validator.isMobilePhone(userPhoneNumberValue)) {
    document.getElementById("validationCustomPhoneNumber").classList.add("is-invalid")
    document.getElementById("phoneValidationText").innerText = "Phone Not Valid";
    document.getElementById("phoneValidationText").className = "invalid-feedback";
    return;
  } else {
    document.getElementById("validationCustomPhoneNumber").classList.remove("is-invalid")
    document.getElementById("validationCustomPhoneNumber").classList.add("is-valid")
    document.getElementById("phoneValidationText").innerText = "Great Phone";
    document.getElementById("phoneValidationText").className = "valid-feedback";
  }
  try {
    const response = await fetch(`${HOST}/api/persons`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userNameValue,
        number: userPhoneNumberValue
      })
    }).then((res) => {
      if (!res.ok) {
        throw new Error("UserNameTaken")
      }
    });
    console.log("here");
    alert("Added to phone book");
  } catch (err) {
    document.getElementById("validationCustomName").classList.add("is-invalid")
    document.getElementById("nameValidationText").innerText = "Name Taken";
    document.getElementById("nameValidationText").className = "invalid-feedback";
  }
}
document.getElementById("getPhonebookBtn").addEventListener("click", getPhoneBook)
document.getElementById("sendServerNewPerson").addEventListener("click", addPersonToServer)