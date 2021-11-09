const submit = document.getElementById("submit");
const nameInput = document.getElementById("nameInput");
const numberInput = document.getElementById("numberInput");

const addPersonToDataBase = async () => {
    try{
    const response = await axios.post("https://fierce-earth-06756.herokuapp.com/api/persons", {
        name: nameInput.value,
        number: numberInput.value
    });
    console.log(response);
}catch(error){
    alert("This name is Taken")
}
}

submit.addEventListener("click", addPersonToDataBase)