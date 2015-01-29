var http = require("http");
function printMessage(username, badgeCount, points){
   var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
   console.log(message);
}

function printError(error){
    console.error(error.message);
}

//Do the GET request
function get(username){
    http.get("http://teamtreehouse.com/" + username + ".json", function responseCallback(response){
        var data = "";
        //Read data
        response.on("data", function dataChunkHandler(chunk){
            data += chunk;
        }).on("end", function endOfDataHandler(){
            if(response.statusCode){
                try {
                    var profile = JSON.parse(data);
                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                } catch (error){
                    printError(error);
                }
            } else{
                var errorMsg = "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")";
                printError({message: errorMsg});
            }
        });
        
        
    }).on("error", printError);
}

module.exports.get = get;