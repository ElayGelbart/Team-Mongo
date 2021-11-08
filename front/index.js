const displayBookBtn = document.getElementById("displayPhoneBook");

const getDataFromServer = async () => {
   const response = await axios.get("http://localhost:3001/api/persons");
   console.log(response.data);
}




displayBookBtn.addEventListener("click", getDataFromServer)