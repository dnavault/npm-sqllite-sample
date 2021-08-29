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

function initDB() {
  db.serialize(function () {
    db.run(
      "IF EXISTS( SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.stpGetAllMembers'))"
    );

    db.run("CREATE TABLE products (info TEXT)");

    var stmt = db.prepare("INSERT INTO products VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Product name " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM products", function (err, row) {
      console.log(row.id + ": " + row.info);
    });
  });
  db.close();
}
