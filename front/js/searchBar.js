const searchBar = document.getElementById("search"); 

searchBar.addEventListener("keyup", (e)=>{              // when the searched value changes
    const searchValue = e.target.value.toLowerCase();   // gets the value in lower case
  

        for(let taskElement of document.getElementsByTagName("td")) {    // gets all tasks on the page
            if(taskElement.innerText.toLowerCase().includes(searchValue)) {
                taskElement.style.display = "table-cell";
               }
               else{
                taskElement.style.display = "none";                     // hides them
               }
        }
               
})