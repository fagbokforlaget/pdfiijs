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
var pii = new pdfii('./sample.pdf', function(err, data) {
  if(err) {
    return console.log("Error: " + err);
  }
  console.log(data);
});
pii.get();

```

### Tests

```
$ make test
```

Coverage report

```
$ make test-cov
```
