var pdfii = require('../index');

var pii = new pdfii('./sample.pdf', null, function(err, data) {
  if(err) {
    return console.log("Error: " + err);
  }
  console.log(data);
});

pii.get();
