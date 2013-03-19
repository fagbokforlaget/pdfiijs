var pdfii = require('pdfiijs');

var pii = new pdfii('./sample.pdf', function(err, data) {
  if(err) {
    return console.log("Error: " + err);
  }
  console.log(data);
});

pii.get();
