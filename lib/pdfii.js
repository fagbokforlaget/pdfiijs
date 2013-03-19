
function pdfii(filename, options, callback) {
  var self = this;

  pdfii.prototype.getPagesCount = function(callback) {
    var pdfinfo = require('pdfinfojs'),
        pinfo = new pdfinfo(filename);
    pinfo.getInfo(function(err, info, params){
      callback(err, info, params);
    });
  };

  pdfii.prototype.getPages = function(filename, pages_count, callback) {
    var pdftotext = require('pdftotextjs'),
        pages = {};
    for (var page = 1; page <= pages_count; page++) {
      var ptext = new pdftotext(filename);
      ptext.add_options(['-f ' + page, '-l ' + page]);
      ptext.getText(function(err, data, cmd) {
        pages[cmd[2]] = data;
        if (Object.keys(pages).length === parseInt(pages_count, 10)) {
          callback(err, pages, cmd);
        }
      });
    }
  };

  pdfii.prototype.getIndexes = function(pages, pages_count, callback) {
    var textii = require('textiijs'),
        indexes = [];
    for (var page = 1; page <= pages_count; page++) {
      var opts = { "section": "page" + page};
      tii = new textii(pages[page], null, function(err, index) {
        indexes.push(index);
        if (indexes.length === parseInt(pages_count, 10)) {
          callback(err, indexes);
        }
      });
      tii.get(opts);
    }
  };

  pdfii.prototype.mergeIndexes = function(indexes, callback) {
    var merged = {};
    for (var i = 0; i < indexes.length; i++) {
      var page_index = indexes[i];
      for (var word in page_index) {
        var word_index = page_index[word];
        if (merged[word]) {
          var section = Object.keys(word_index)[0];
          merged[word][section] = page_index[word][section];
        } else {
          merged[word] = page_index[word];
        }
      }

    }
    callback(null, merged);
  };

  pdfii.prototype.get = function(opts) {
    self.getPagesCount(function(err, info) {
      var pages_count = info.pages;
      self.getPages(filename, pages_count, function(err, pages) {
        self.getIndexes(pages, pages_count, function(err, indexes) {
          self.mergeIndexes(indexes, function(err, merged_indexes) {
            callback(err, merged_indexes);
          });
        });
      });
    });
  };

}

// module exports
exports = module.exports = function(filename, options, callback) {
  return new pdfii(filename, options, callback);
};
