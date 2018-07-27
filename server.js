var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const scrapey = require("./services/scrapey");
const exphbs = require('express-handlebars');


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
  extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost:27017/news");
 mongoose.connect("mongodb://heroku_m8sv3k43:2ahm95nkp411l99suuq98uuesf@ds253831.mlab.com:53831/heroku_m8sv3k43");

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {


  // Create a new Article using the `result` object built from scraping
  //Whenever callback in scrapey is called.. this will run
  scrapey(function (err) {
    res.render("scrape-complete")
  });



});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {

scrapey()
  .then(function () {
    db.Article.find({}, function (err, articles) {
       res.render("articles", {articles:articles})
    });
  })
  .catch(function (err) {
    // If an error occurred, send it to the client
res.send(err);
  });



});




// TODO: Finish the route so it grabs all of the articles


// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {




  db.Article.find({
    _id: ObjectId(req.params.id)
  })
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});