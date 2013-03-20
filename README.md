## pdfiijs

[![Build Status](https://travis-ci.org/fagbokforlaget/pdfiijs.png)](https://travis-ci.org/fagbokforlaget/pdfiijs)

PDF inverted index generator for node.

Creates inverted index from PDF file.
The text inverted index generator is based on [textiijs](https://github.com/fagbokforlaget/textiijs).

### Installation

via npm:

```
$ npm install pdfiijs
```

### Usage

```
var pdfii = require('pdfiijs');

var pii = new pdfii('./sample.pdf');

pii.get(function(err, data) {
  if(err) {
    return console.log("Error: " + err);
  }
  console.log(data);
});
```

### Tests

```
$ make test
```

Coverage report

```
$ make test-cov
```
