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
          zero: { '1': [ 0 ], '2': [ 0 ] },
          three: { '1': [ 3 ], '2': [ 3 ] },
          five: { '1': [ 5 ], '2': [ 5 ] },
          six: { '1': [ 6 ], '2': [ 6 ] },
          seven: { '1': [ 7, 8 ], '2': [ 7, 8 ] },
          included: { '1': [ 18 ], '2': [ 18 ] },
          one: { '1': [ 19 ], '2': [ 19 ] },
          test: { '1': [ 21, 22 ], '2': [ 21, 22 ] },
          good: { '1': [ 24 ], '2': [ 24 ] },
          alwai: { '1': [ 25 ], '2': [ 25 ] },
          now: { '3': [ 0 ] },
          comma: { '3': [ 2 ] },
          separ: { '3': [ 3 ] },
          valu: { '3': [ 4 ] }
        };
        assert(expected.equals(data));
        done();
      });
    });

  });

});
