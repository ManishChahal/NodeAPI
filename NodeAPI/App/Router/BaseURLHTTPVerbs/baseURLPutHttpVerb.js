let databaseConnection = require('../../Utility/mongoConnection');

function updateDataInMongo(data , response){
    let db = databaseConnection.databaseConnection();
    let year = data.year;
    let goalsScored = data.goalsScored;
    db.footballersData.update({year : year},{$set : {goalsScored : goalsScored}},{multi : true}, function(error , result){
        if(error){
            response.end("Unable to update data due to server issues");
        }
        else{
            let documentsUpdated = result.nModified;
            db.footballersData.find({year : year , goalsScored : goalsScored},function(error , data){
                if(error){
                    response.end("Unable to fetch updated documents");
                }
                else{
                    let totalRecordsUpdated = {recordsUpdated : documentsUpdated , actualData : data};
                    response.end(JSON.stringify(totalRecordsUpdated));
                }
            })
        }
    })
}


function baseURLPutHttpVerb(request , response){
    let putData ="";

    request.on('data',function(data){
        putData += data;
    });

    request.on('end',function(){
        let putParsedData = JSON.parse(putData);
        updateDataInMongo(putParsedData , response);
    })
}

module.exports = {
    baseURLPutHttpVerb : baseURLPutHttpVerb
}