let databaseConnection = require('../../Utility/mongoConnection');

function updateDataWithParametersInMongo(paramOne , paramTwo , updateData , response){
    let db = databaseConnection.databaseConnection();
    db.footballersData.update({fName : paramOne , year : paramTwo}, {$set : {goalsScored : updateData}}, {multi : true},function(error , result){
        if(error){
            response.send("Unable to update data");
        }
        else{
            let recordsUpdated = result.nModified;
            db.footballersData.find({year : paramTwo , fName : paramOne} , function(error , data){
                if(error){
                    return "Unable to fetch updated data";
                }
                else
                {
                    let finalResult = {recordsUpdated : recordsUpdated ,actualData : data };
                    response.end(JSON.stringify(finalResult));
                }
            });
            
        }
    })
}

function paramsURLPutHttpVerbWithParameters(request , response){
    let putParameterOne = request.params.paramOne;
    let putParameterTwo = +request.params.paramTwo;
    let putParamData = "";
    request.on('data',function(data){
        putParamData += data;
    })

    request.on('end',function(){
        let parsedPutParamData = +putParamData;
        updateDataWithParametersInMongo(putParameterOne,putParameterTwo,parsedPutParamData,response);
    })
}

module.exports = {
    paramsURLPutHttpVerbWithParameters : paramsURLPutHttpVerbWithParameters
}