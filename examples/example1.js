// var pdfii = require('pdfiijs');
var pdfii = require('../index');

var pii = new pdfii('./sample.pdf');

pii.get(function(err, data) {
  if(err) {
    return console.log("Error: " + err);
  }
  console.log(data);
});
