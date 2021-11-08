const displayBookBtn = document.getElementById("displayPhoneBook");

const getDataFromServer = async () => {
   const response = await axios.get("https://fierce-earth-06756.herokuapp.com/api/persons");
   console.log(response.data);
}




displayBookBtn.addEventListener("click", getDataFromServer)