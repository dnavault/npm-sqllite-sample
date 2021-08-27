var http = require("http");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(":memory");

//create a server object:
http
  .createServer(function (req, res) {
    res.write("Hello dded!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
