Errors = new Mongo.Collection(null); //creating a local client-only collection to temporarily store data for errors.

throwError = function(message) {
  Errors.insert({message})
};
