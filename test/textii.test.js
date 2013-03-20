require('./helpers/obj_equals');

var assert = require("assert"),
    pdfii = require('../index'),
    sample_pdf = './test/pdf/sample.pdf'

describe('pdfii', function() {

  describe('#get()', function() {

    it('should create reverted index with sections', function(done) {
      var pii = new pdfii(sample_pdf);
      pii.get(function(err, data) {
        if (err) {
          throw err;
        }
        var expected = {
          zero: { page1: [ 0 ], page2: [ 0 ] },
          three: { page1: [ 3 ], page2: [ 3 ] },
          five: { page1: [ 5 ], page2: [ 5 ] },
          six: { page1: [ 6 ], page2: [ 6 ] },
          seven: { page1: [ 7, 8 ], page2: [ 7, 8 ] },
          included: { page1: [ 18 ], page2: [ 18 ] },
          one: { page1: [ 19 ], page2: [ 19 ] },
          test: { page1: [ 21, 22 ], page2: [ 21, 22 ] },
          good: { page1: [ 24 ], page2: [ 24 ] },
          alwai: { page1: [ 25 ], page2: [ 25 ] },
          now: { page3: [ 0 ] },
          comma: { page3: [ 2 ] },
          separ: { page3: [ 3 ] },
          valu: { page3: [ 4 ] }
        };
        assert(expected.equals(data));
        done();
      });
    });

  });

});
