let databaseConnection = require('../../Utility/mongoConnection');

function deleteDataWithParametersFromMongo(deleteParamOne,deleteParamTwo,response){
    let db = databaseConnection.databaseConnection();
    db.footballersData.find({fName : deleteParamOne , lName : deleteParamTwo}, function(error , data){
        if(error){
            response.send("No such data exists");
        }
        else{
            let dataToBeDeleted = data;
            /*
            deleteParamTwo = dataToBeDeleted[0].fName;
            deleteParamTwo = dataToBeDeleted[0].lName;
            */
            db.footballersData.remove({fName : deleteParamOne , lName : deleteParamTwo}, function(error , result){
                if(error)
                {
                    response.send("Unable to delete documents");
                }
                else{
                    let finalDeletedResult = {recordsDeleted : result.deletedCount , dataToBeDeleted : dataToBeDeleted};
                    response.end(JSON.stringify(finalDeletedResult));
                }
            })
        }
    })
}

function paramsURLDeleteHttpVerbWithParameters(request , response){
    let deleteParamOne = request.params.paramOne;
    let deleteParamTwo = request.params.paramTwo;
    deleteDataWithParametersFromMongo(deleteParamOne,deleteParamTwo,response);
}

module.exports = {
    paramsURLDeleteHttpVerbWithParameters : paramsURLDeleteHttpVerbWithParameters
}