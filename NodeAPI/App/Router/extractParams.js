let pathsArray = [];
let routesCount = 0;

function defineRoutes(routeArray){
    if(routeArray instanceof Array)
    {
        for(let index = 0 ; index < routeArray.length ; index++)
        {
            if(pathsArray.length > 0)
            {
                for(let i = 0 ; i < pathsArray.length ; i++)
                {
                    if(pathsArray[i].path === routeArray[index].path)
                    {
                        if(pathsArray[i].params || routeArray[index].params)
                        {
                            if(pathsArray[i].params && routeArray[index].params)
                            {
                                if(pathsArray[i].params.length !== routeArray[index].params)
                                {
                                    pathsArray.push(routeArray[index]);
                                }
                            }
                            else if(routeArray[index].params)
                            {
                                pathsArray.push(routeArray[index]);
                            }
                        }   
                    }
                    else
                    {
                        pathsArray.push(routeArray[index]);
                    }
                }
            }
            else
            {
                pathsArray.push(routeArray[0]);
            }
        }
    }
    else if(routeArray instanceof Object)
    {
        if(pathsArray.length > 0)
        {
            for(let index = 0 ; index < pathsArray.length ; index++)
            {
                if(pathsArray[i].path === routeArray.path)
                {
                    if(pathsArray[i].params.length !== routeArray.params.length)
                    {
                        pathsArray.push(routeArray);
                    }
                }
                else
                {
                    pathsArray.push(routeArray);
                }
            }
        }
    }
    return pathsArray;
}
/*
function removeRoute(){

}

function updateRoute(){

}

function addRoute(){

}
*/

function routeCount(){
    if(pathsArray.length > 0)
    {
        routesCount = pathsArray.length;
    }
    return routesCount;
}

function createPathName(exactPath , routeParams){
    let pathname = exactPath;
    if(routeParams)
    {
        for(key in routeParams)
        {
            pathname = pathname.concat("/:").concat(key);
        }
    }
    return pathname;
}

function setRouteParams(request , requestURL){
    let pathName = requestURL.pathname;
    let currentMatched = 0;
    let maximumMatched = 0;
    let pathsArrayPath = [];
    let highestSpecificPath = [];
    let paramsObject = {};
    let splittedPathArray = pathName.split('/');
    splittedPathArray = splittedPathArray.slice(1);

    for(let index =0 ; index < pathsArray.length ; index++)
    {
        pathsArrayPath = pathsArray[index].path.split("/");
        pathsArrayPath = pathsArrayPath.slice(1);
        for(let i = 0 ; i<  pathsArrayPath.length; i++)
        {
            if(pathsArrayPath[i] === splittedPathArray[i])
            {
                currentMatched++;
            }
        }
        if(currentMatched > maximumMatched && pathsArrayPath[0] !== "")
        {
            maximumMatched = currentMatched;
            highestSpecificPath.push(pathsArray[index]);
            currentMatched = 0;
        }
        if(currentMatched === maximumMatched && currentMatched !== 0 && maximumMatched !==0)
        {
            highestSpecificPath.push(pathsArray[index]);
            currentMatched = 0;
        }
        if(maximumMatched === 0 && highestSpecificPath.length === 0)
        {
            for(let o = 0; o < pathsArray.length ; o++)
            {
                if(pathsArray[o].path === "/")
                {
                    highestSpecificPath.push(pathsArray[o]);
                    break;
                }
            }
        }
    }
    /*
    pathName = highestSpecificPath.path;
    paramsObject.pathName = pathName;
    */
    let tempObj = {};
    let tempOptionalParams =[];
    let sortedSpecificPathArray = [];
    if(highestSpecificPath && highestSpecificPath[0].path !== "/")
    {
        if(highestSpecificPath.length > 1)
        {
            sortedSpecificPathArray = highestSpecificPath.sort(function(a , b){
                return a.params.length - b.params.length
            });
            highestSpecificPath = sortedSpecificPathArray;
        }
        if(splittedPathArray.length > maximumMatched)
        {
            let tempSplittedPath = splittedPathArray;
            tempSplittedPath = tempSplittedPath.slice(maximumMatched);
            for(let k =0 ; k < highestSpecificPath.length ; k++)
            {
                if(tempSplittedPath.length >= highestSpecificPath[k].params.length && highestSpecificPath[k].params && tempSplittedPath.length)
                {
                    if(tempSplittedPath.length === highestSpecificPath[k].params.length)
                    {
                        for(let x = 0 ; x < highestSpecificPath[k].params.length ; x++)
                        {
                            tempObj[highestSpecificPath[k].params[x]] = tempSplittedPath[x];
                        }
                        paramsObject.parameters = tempObj;
                        paramsObject.pathname = createPathName(highestSpecificPath[k].path ,tempObj);
                        tempObj = {};
                        return paramsObject;
                    }
                    else if(tempSplittedPath > highestSpecificPath[k].params.length)
                    {
                        for(let y = 0 ; y < highestSpecificPath[k].params.length ; y++)
                        {
                            tempObj[highestSpecificPath[k].params[x]] = tempSplittedPath[x];
                        }
                        let optionalParams = [];
                        tempOptionalParams = tempSplittedPath;
                        tempOptionalParams = tempOptionalParams.slice(highestSpecificPath[k].params.length);
                        if(tempOptionalParams.length > 0)
                        {
                            for(let j =0 ; n < tempOptionalParams.length; j++)
                                {
                                    optionalParams.push(tempOptionalParams[j]);
                                }
                        }
                        paramsObject.pathname = createPathName(highestSpecificPath[k].path ,tempObj);
                        paramsObject.parameters = tempObj;
                        paramsObject.optionalParams = optionalParams;
                        tempObj = {};
                        return paramsObject;
                    }
                }
            }
        }
    }
    else(highestSpecificPath[0].path === "/")
    {
        if(highestSpecificPath[0].params)
        {
            let temporarySplitted = splittedPathArray;
            temporarySplitted = temporarySplitted.slice(maximumMatched);
            for(let x = 0 ; x < highestSpecificPath[0].params.length ; x++)
                {
                    tempObj[highestSpecificPath[0].params[x]] = tempSplittedPath[x];
                }
            paramsObject.pathname = createPathName(highestSpecificPath[0].path ,tempObj);
            paramsObject.parameters = tempObj;
            paramsObject.optionalParams = optionalParams;
            tempObj = {};
            return paramsObject;
        }
        else{
            paramsObject.pathname = highestSpecificPath[0].path;
            return paramsObject;
        }
    }
}
/*
function extractParams(pathName){
    return {
        
    }
}
*/

module.exports = {
    setRouteParams : setRouteParams,
    routeCount : routeCount,
    defineRoutes : defineRoutes
}