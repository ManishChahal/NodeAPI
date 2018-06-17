let databaseConnection = require('../../Utility/mongoConnection');

function deleteDataFromMongo(data , response){
    let db = databaseConnection.databaseConnection();
    let deleteDataObj = data;
    db.footballersData.find({fName : deleteDataObj.fName , lName : deleteDataObj.lName},function(error , result){
        if(error){
            response.end("Unable to fetch records");
        }
        else{
            let dataToBeDeleted = result;
            db.footballersData.remove({fName : deleteDataObj.fName , lName : deleteDataObj.lName},{justOne : true},function(error , data){
                if(error){
                    response.end("Unable to delete data from server due to server issues");
                }
                else{
                    let deletedData = {recordsDeleted : data.deletedCount , dataToBeDeleted : dataToBeDeleted};
                    response.end(JSON.stringify(deletedData));
                }
            })
        }
    })   
}

function baseURLDeleteHttpVerb(request , response){
    let deleteData = "";
    request.on('data',function(data){
        deleteData += data;
    })

    request.on('end',function(){
        let deleteParsedData = JSON.parse(deleteData);
        deleteDataFromMongo(deleteParsedData , response);
    })
}

module.exports = {
    baseURLDeleteHttpVerb : baseURLDeleteHttpVerb
}