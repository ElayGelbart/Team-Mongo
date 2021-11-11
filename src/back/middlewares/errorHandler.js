function errorHandler(err, req, res, next){
    console.log(err);
    if(err.status){
        res.status(err.status).send({error: err.message});
        return;
    }
    else{
        res.status(500).send({error: 'Server error'});
        return;
    }
}

module.exports = errorHandler;
