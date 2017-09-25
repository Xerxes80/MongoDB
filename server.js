var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
require("./config/routes")(router);
//var request = require("request");
//var cheerio = require("cheerio");
//var methodOverride = require("method-override");
//var Note = require("./models/Note.js");
//var Article = require("./models/Article.js");
//var routes = require("./routes/routes.js");
var port = process.env.PORT || 3000;
var app = express();

mongoose.Promise = Promise;
var router =express.Router();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "views"));
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

//=====================
//
//app.get("/", function(req, res){
//     Article.find({}, function(error, doc) {
////         console.log("posted");
////         console.log(doc.length);
//         
//    if (error) {
//      console.log(error);
//    }else {
//        if(doc.length > 0){
//             res.render("index", { articles: doc });
//            
//        }else{
//            res.render("index", { articles: doc });
//        }
//    }
//  });
//});
//
//app.get("/scrape", function(req, res) {
//
//  request("http://www.nytimes.com/", function(error, response, html) {
//
//    var $ = cheerio.load(html);
//       
//    $("article").each(function(i, element) {
//      
//        var result = {};
//        Article.remove({}, function(error, doc) {
//
//        if (error) {
//          console.log(error);
//        }
//        });
//        
//        result.title = $(this).children("h2").children("a").text();
//        result.text = $(this).children("p").text();
//
//        var entry = new Article(result);
//
//        entry.save(function(err, doc) {
//
//        if (err) {
//          console.log(err);
//        }
//      });
// 
//    });
//      
//  });
//
//    
//    Article.find({}, function(error, doc) {
//         console.log("posted");
//         console.log(doc.length);
//         
//    if (error) {
//      console.log(error);
//    }else {
//       // res.render("index", { number: doc });
//    }
//  });
//    
//    
//    
//    
//});
//
//
//
//app.get("/articles", function(req, res) {
//    
//  Article.find({}, function(error, doc) {
//
//    if (error) {
//      console.log(error);
//    }
//
//    else {
//      res.render("index", { articles: doc });
//        
//    }
//   
//  });
//});
//
//app.get("/articles/:id", function(req, res) {
//
//  Article.findOne({ "_id": req.params.id })
//
//  .populate("note")
//
//  .exec(function(error, doc) {
//
//    if (error) {
//      console.log(error);
//    }
//
//    else {
//      res.json(doc);
//    }
//  });
//});
//
//
//app.post("/articles/:id", function(req, res) {
//  var newNote = new Note(req.body);
//  newNote.save(function(error, doc) {
//    if (error) {
//      console.log(error);
//    }
//    else {
//      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
//      .exec(function(err, doc) {
//        if (err) {
//          console.log(err);
//        }
//        else {
//          res.send(doc);
//        }
//      });
//    }
//  });
//});


//=====================

app.listen(port, function() {
  console.log("App running on port: %s", port);
});