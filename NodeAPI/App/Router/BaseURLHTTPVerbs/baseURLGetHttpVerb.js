let databaseConnection = require('../../Utility/mongoConnection');

function baseURLGetHttpVerb(request , response){
    let db = databaseConnection.databaseConnection();
    db.footballersData.find({}, function(error , data){
        if(error)
        {
            response.end("Unable to fetch data , some error occured");
        }
        
        else if(data.length === 0){
            response.end("Invalid data retrieved");
        }

        else {
            response.end(JSON.stringify(data));
        }
    })
}

module.exports = {
    baseURLGetHttpVerb : baseURLGetHttpVerb
}