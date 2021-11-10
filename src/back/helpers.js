function getMatchingPerson(inputId, data){
    for(let person in data){
        if(data[person].id === inputId){
            return data[person];
        }
    }
    return;
}

function checkTakenName(inputName, data){
    for(let person in data){
        if(data[person].name === inputName) return true;
    }
    return false;
}

module.exports = {
    getMatchingPerson,
    checkTakenName,
}
