let baseURLGetHtppVerb = require('./BaseURLHTTPVerbs/baseURLGetHttpVerb');
let baseURLPostHttpVerb = require('./BaseURLHTTPVerbs/baseURLPostHttpVerb');
let baseURLPutHttpVerb = require('./BaseURLHTTPVerbs/baseURLPutHttpVerb');
let baseURLDeleteHttpVerb = require('./BaseURLHTTPVerbs/baseURLDeleteHttpVerb');

function baseURLRouter(request , response){
    let requestMethod = request.method.toUpperCase();
    //Based on the type of the http verb we will be making appropriate calls to our functions
    switch(requestMethod)
    {
        case "GET" :
            baseURLGetHtppVerb.baseURLGetHttpVerb(request , response);
        break;

        case "POST" :
            baseURLPostHttpVerb.baseURLPostHttpVerb(request , response);
        break;

        case "PUT" :
            baseURLPutHttpVerb.baseURLPutHttpVerb(request , response);
        break;

        case "DELETE" :
            baseURLDeleteHttpVerb.baseURLDeleteHttpVerb(request , response);
        break;

        default :
            response.end("Request to invalid http verb");
        break;
    }
}

module.exports = {
    baseURLRouter : baseURLRouter
}