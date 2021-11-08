const displayBookBtn = document.getElementById("displayPhoneBook");

const getDataFromServer = async () => {
   const response = await axios.get("localhost:3001/api/persons/");
   console.log(response);
}




displayBookBtn.addEventListener("click", getDataFromServer)