/*
HTTP module will help us in creating http server that will provide us the ability to listen to incoming
client requests on a particular port and based on the request we perform desired functionality.
It provides us a method to create a server which will return a server object
The create server method takes a callback function as parameter , when there is a request on the port
on which our server is listening that callback function is called
*/
let http = require('http');
let url = require('url');
let router = require('./Router/router');
let routeObj = require('./Router/extractParams');

let server = http.createServer(function(request , response){
    /*When you make a call to a URL , two requests are made each time one for the request URL and the other for 
    /favicon.ico , so when you will log to the console the name of the pathname it will show you the path
    requested by you first then the request to favicon.ico , it irritates a lot , so in order to suppress the 
    call to that URL you can make use of following code*/
    
    if(url.parse(request.url).pathname === "/favicon.ico")
    {
        response.end();
        return;
    }

    let headers = {};
    // set header to handle the CORS
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With';
    headers['Access-Control-Allow-Methods'] = 'GET, DELETE, PUT, POST, OPTIONS';
    headers["Access-Control-Max-Age"] = '86400';
    response.writeHead(200, headers);

    //Setting my route paths
    let routes = [{path : '/params', params : ['paramOne','paramTwo']},
                  {path : '/'}];
    
    if(routeObj.routeCount() === 0 || routes.length > routeObj.routeCount())
    {
        routeObj.defineRoutes(routes);
    }
    
    //Calling our router which will redirect the request to proper function based on URL path
    router.router(request , response);
}).listen(5051);

console.log("Server has started listening on port 5051");