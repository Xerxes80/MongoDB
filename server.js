var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
require("./config/routes")(router);

var port = process.env.PORT || 3000;
var app = express();

mongoose.Promise = Promise;
var router = express.Router();

app.use(express.static(__dirname + "/public"));

app.use(router);
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

var db = mongoose.connection;

mongoose.connect("mongodb://localhost/mongoScraperDB");

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(port, function() {
  console.log("App running on port: %s", port);
});