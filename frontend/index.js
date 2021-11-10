const myAPI = "https://phonebookshaked.herokuapp.com"
// const myAPI = "http://localhost:3001"

const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const pNumber = document.getElementById("pnumber");
const addBtn = document.getElementById("addBtn");
const errormsg = document.getElementById("errormsg");
const book = document.getElementById("book");
const showAll = document.getElementById("showAll");
const hideAll = document.getElementById("hideAll");

addBtn.addEventListener("click", async function(){
    const firstName = fName.value;
    const lastName = lName.value;
    const phoneNumber = pNumber.value;
    const fullName = firstName + " " + lastName;
    if(!fName.value){
        errormsg.innerText = "Please Enter The First Name";
        setTimeout(()=>{errormsg.innerText = ""}, 2000)  
        return;
    }if(!lName.value){
        errormsg.innerText = "Please Enter The Last Name";
        setTimeout(()=>{errormsg.innerText = ""}, 2000)
        return;
    }if(!pNumber.value ){
        errormsg.innerText = "Please Enter The Phone Number";
        setTimeout(()=>{errormsg.innerText = ""}, 2000)
        return;
    }
    try {
        console.log("before axios");
        const response = await axios.post(`${myAPI}/api/persons`, {
            "name" : fullName,
            "number" : phoneNumber  
        })
        console.log("after axios",response);
        errormsg.innerText = response.data;
        setTimeout(()=>{errormsg.innerText = ""}, 3000);
        addContact(fullName, phoneNumber);
        
    } catch (error) {
        errormsg.innerText = error.response.data;
        setTimeout(()=>{errormsg.innerText = ""}, 3000);
    }
})

showAll.addEventListener("click", async function(){
    await startPage()
    console.log("in front show");
    showAll.style.visibility ="hidden";
    hideAll.style.visibility = "visible";
})

hideAll.addEventListener("click", function(){
    const num = book.childElementCount;
    for(let i = 0; i < num-1 ; i++){
        book.removeChild(book.lastChild);
      }
      hideAll.style.visibility = "hidden";
      showAll.style.visibility = "visible";
})

function addContact(name, number){
    const contact = document.createElement("tr")
    const tdName = document.createElement("td")
    const tdNumber = document.createElement("td")
    const favorite = document.createElement("td")
    const deleteOption = document.createElement("td")
    tdName.innerText = name;
    tdNumber.innerText = number;
    favorite.innerText = "Favorites";
    deleteOption.innerText = "Delete";
    favorite.classList.add("cursorPink");
    deleteOption.classList.add("cursorRed");
    favorite.addEventListener("click", function(){makeFavorite(contact)});
    deleteOption.addEventListener("click", async function(){await deleteContact(contact, name)});
    contact.classList.add("dropDownDiv");
    tdName.append(favorite);
    tdName.append(deleteOption);
    contact.append(tdName);
    contact.append(tdNumber);
    book.append(contact);
}

async function deleteContact(contact, name){
    contact.remove();
    let id;
    const data = await axios.get(`${myAPI}/api/persons`);
    for(let i = 0; i < data.data.length ; i++){
        if(data.data[i].name === name){
            id = data.data[i].id;
        }
    }
    const response = await axios.delete(`${myAPI}/api/persons/${id}`)
}

function makeFavorite(element){
    element.classList.toggle("favorite");
}

async function startPage(){
    const data = await axios.get(`${myAPI}/api/persons`);
    console.log(data);
    for(let i = 0 ; i < data.data.length ; i++){
        addContact(data.data[i].name, data.data[i].number)
    }
}
