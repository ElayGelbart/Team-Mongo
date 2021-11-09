const errorHandler = (error, req, res, next) => {
  switch (error) {
    case 400:
      res.status(400);
      res.send("We didnt find a person with that ID");
      next();
      break;
    case 406:
      res.status(406);
      res.send("The name already exists");
      next();
      break;
    case (422):
        res.status(422);
        res.send("You must provide a Name and Number");
        next();
        break;
    default:
      res.status(500);
      res.send("Server error, please try again later");
      next();
      break;
  }
};

module.exports = {
    errorHandler
};