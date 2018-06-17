function mongoConnection(){
    let mongo = require('mongojs');
    let databaseURL = "localhost/myFirstDatabase";
    let collections = ["footballersData"];
    let db = mongo(databaseURL , collections);
    return db;
}

module.exports = {
    databaseConnection : mongoConnection
}