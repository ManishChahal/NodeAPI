//let queryString = require('querystring');
let databaseConnection = require('../../Utility/mongoConnection');

function insertDataIntoMongo(data, response){
    let db = databaseConnection.databaseConnection();
    db.footballersData.insert(data , function(error , result){
        if(error){
            response.end("Unable to insert data");
        }
        else{
            response.end(JSON.stringify(result));
        }
    })
}

function baseURLPostHttpVerb(request , response){
    let postData = "";
    //When there is an incoming post request and data is sent as part of body we make use of events
    //Called when data start flowing
    request.on('data', function(data){
        postData += data;
    });

    //Called when all the data has been received    
    request.on('end',function(){
        /*
        console.log(postData);
        let fName = parsedPostData.fName;
        let lName = parsedPostData.lName;
        let league = parsedPostData.league;
        let goalsScored = parsedPostData.goalsScored;
        let year = parsedPostData.year;
        */
       let parsedPostData = JSON.parse(postData);
        insertDataIntoMongo(parsedPostData , response);
    });
}

module.exports = {
    baseURLPostHttpVerb : baseURLPostHttpVerb
}