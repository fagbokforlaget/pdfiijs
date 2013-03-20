## pdfiijs

[![Build Status](https://travis-ci.org/fagbokforlaget/pdfiijs.png)](https://travis-ci.org/fagbokforlaget/pdfiijs)

PDF inverted index generator for node.

Creates inverted index from PDF file.
The text inverted index generator is based on [textiijs](https://github.com/fagbokforlaget/textiijs).

### Requirements
This package is also based on two other packages: [pdftotext](https://github.com/fagbokforlaget/pdftotextjs)
and [pdfinfo](https://github.com/fagbokforlaget/pdfinfojs).
They both depends on __pdftotext__ and __pdfinfo__ being a part of __poppler-utils__.

To install __poppler-utils__ follow the instructions:

##### Ubuntu/Debian

```
$ sudo apt-get install poppler-utils
```

##### MacOSX

```
$ sudo port install poppler` or `brew install xpdf
```

##### Windows

download and install [Xpdf](http://www.foolabs.com/xpdf/download.html).

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
