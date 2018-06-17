let databaseConnection = require('../../Utility/mongoConnection');

function getDataFromMongoWithParameters(getParameterOne, getParameterTwo , response){
    let db = databaseConnection.databaseConnection();
    db.footballersData.find({fName : getParameterOne , lName : getParameterTwo}, function(error , data){
        if(error)
        {
            return "Unable to fetch data due to some issues";
        }

        else if (data.length === 0){
            return "Invalid data returned";
        }

        else {
            response.end(JSON.stringify(data));
        }
    })
}

function paramsURLGetHttpVerbWithParameters(request , response){
    let getParameterOne = request.params.paramOne;
    let getParameterTwo = request.params.paramTwo;
    getDataFromMongoWithParameters(getParameterOne , getParameterTwo , response);
    
}

module.exports = {
    paramsURLGetHttpVerbWithParameters : paramsURLGetHttpVerbWithParameters
}