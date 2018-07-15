var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");
// First, tell the console what server.js is doing

// Require all models
var db = require("../models");


module.exports = function (callback) {


  console.log("\n***********************************\n" +
    "Grabbing every article \n" +
    "from mmaNews.com:" +
    "\n***********************************\n");
  
  // An empty array to save the data that we'll scrape
  var results = [];
  // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
  request("http://www.mmanews.com/", function (error, response, html) {
    var $ = cheerio.load(html);
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $(".wpb_column.vc_column_container.td-pb-span8 .td-block-span12").each(function (i, element) {
      // Save the text of the element in a "title" variable


      var url = $(this).find(".entry-title").children('a').attr('href');




      var title = $(this).find(".entry-title").children('a').text();
      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the  valuesfor any "href" attributes that the child elements may have
      // var date = $(this).children("b").text();



      var description = $(this).find(".td-excerpt").text().replace(/(\r\n\t|\n|\r\t)/gm, "");




      // var date = $(element).children().class('news-date');
      // var date = $(element).children().span();
      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        url: url,

        description: description,


        title: title


      });



    });



  });

  return db.Article.insertMany(results)

}