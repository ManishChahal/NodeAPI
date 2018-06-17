let databaseConnection = require('../../Utility/mongoConnection');


function insertDataIntoMongoWithParameters(paramOne,paramTwo,data,response)
{
    let db = databaseConnection.databaseConnection();
    let dataObj = {fName : paramOne , lName : paramTwo , league : data.league , goalsScored : data.goalsScored , year : data.year};
    db.footballersData.insert(dataObj , function(error , result){
        if(error)
        {
            return "Unable to insert data due to some issues";
        }
        else{
            response.end(JSON.stringify(result));
        }
    })

}

function paramsURLPostHttpVerbWithParameters(request , response){
    let paramPostData = "";
    let postParameterOne = request.params.paramOne;
    let postParameterTwo = request.params.paramTwo;

    request.on('data',function(data){
        paramPostData += data;
    })

    request.on('end',function(){
        let parsedParamPostData = JSON.parse(paramPostData);
        insertDataIntoMongoWithParameters(postParameterOne,postParameterTwo,parsedParamPostData,response);
    })
}

module.exports = {
    paramsURLPostHttpVerbWithParameters : paramsURLPostHttpVerbWithParameters
}