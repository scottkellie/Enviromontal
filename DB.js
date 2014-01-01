var databaseURI = "localhost:27017/Enviromontal";
var collections = ["readings", "commands", "variables"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;