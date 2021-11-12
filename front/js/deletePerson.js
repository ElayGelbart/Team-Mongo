
deletePersonfromDataBase = async (personId) => {
    
    try {
    const response = await axios.delete(`http://localhost:3001/api/persons/${personId}`); 
}catch(error){
    alert("We Were Unable To Delete this person, Sorry..")
}
}

submit.addEventListener("click", addPersonToDataBase)