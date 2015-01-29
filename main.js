//Connect to API URL (http://teamtreehouse.com/username.json)
var profile = require("./profile");

var users = process.argv.slice(2);
users.forEach(profile.get);