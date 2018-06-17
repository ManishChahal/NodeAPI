/* URL module is used for extracting the URL of the request and then based on the pathname and the 
search options passed we perform actions*/
let url = require('url');
let queryString = require('querystring');
let baseURLRouter = require('./baseURLRouter');
let paramsURLRouter = require('./paramsURLRouter');
let routesObj = require('../Router/extractParams');

function extractPathName(request , response){
    /*Request URL is being parsed using the parse method of the URL module which will return us the url
    which will contain pathname search and the host details as well */
    let requestURL = url.parse(request.url);
    let updatedRequestObject = routesObj.setRouteParams(request , requestURL);
    /*Extracting the pathname of the URL which wiss give us only the fragment identifier string , for eg :
    http://localhost:/params?name=Manish , patname will only return us the /params*/
    return updatedRequestObject;
}

/*
Function to be called when there is an incoming request to the server from client , we will be calling the 
extractPathName method and on the basis of the patname returned will decide which function to be called
*/
function router(request , response){
    let requestObject = extractPathName(request , response);
    let requestURLPathName = requestObject.pathname;
    if(requestObject.parameters || requestObject.optionalParams)
    {
        if(requestObject.parameters && requestObject.optionalParams)
        {
            request.params = requestObject.parameters;
            request.optionalParams = requestObject.optionalParams;
        }
        else if(requestObject.parameters)
        {
            request.params = requestObject.parameters;
        }
        else if(requestObject.optionalParams)
        {
            request.optionalParams = requestObject.optionalParams;
        }
    }
    switch(requestURLPathName)
    {
    //If we get a request for /params path then we are going to call the paramsURLRouter method
    case "/params/:paramOne/:paramTwo" :
        paramsURLRouter.paramsURLRouter(request , response);
        break;
    //If we get a request for /params path then we are going to call the baseURLRouter method
    case "/" :
        baseURLRouter.baseURLRouter(request , response);
        break;
    //If a request to invalid path is received then following functionality will be called
    default :
        console.log("Invalid request URL");
        break;
    }

}

module.exports = {
    router : router
}