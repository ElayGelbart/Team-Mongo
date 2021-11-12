const submit = document.getElementById("submit");
const nameInput = document.getElementById("nameInput");
const numberInput = document.getElementById("numberInput");

const addPersonToDataBase = async () => {
    try {
    const response = await axios.post("http://localhost:3001/api/persons", {
        name: nameInput.value,
        number: numberInput.value
    });
    alert(response.data);
    console.log(response); 
}catch(error){
    alert("This name is Taken")
}
}

submit.addEventListener("click", addPersonToDataBase)