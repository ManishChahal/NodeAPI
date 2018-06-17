let getDataWithParameters = require('./ParamsURLHTTPVerbs/paramsURLGetHttpVerb');
let postDataWithParameters = require('./ParamsURLHTTPVerbs/paramsURLPostHttpVerb');
let putDataWithParameters = require('./ParamsURLHTTPVerbs/paramsURLPutHttpVerb');
let deleteDataWithParameters = require('./ParamsURLHTTPVerbs/paramsURLDeleteHttpVerb');

function paramsURLRouter(request , response){
    let requestMethod = request.method.toUpperCase();

    switch(requestMethod)
    {
        case "GET" :
            getDataWithParameters.paramsURLGetHttpVerbWithParameters(request , response);
        break;

        case "POST" :
            postDataWithParameters.paramsURLPostHttpVerbWithParameters(request , response);
        break;

        case "PUT" :
            putDataWithParameters.paramsURLPutHttpVerbWithParameters(request , response);
        break;

        case "DELETE" :
            deleteDataWithParameters.paramsURLDeleteHttpVerbWithParameters(request , response);
        break;

        default :
            response.end("Request to invalid params http verb");
        break;
    }
}

module.exports = {
    paramsURLRouter : paramsURLRouter
}