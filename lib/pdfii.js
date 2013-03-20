var pdfinfo = require('pdfinfojs'),
    pdftotext = require('pdftotextjs'),
    textii = require('textiijs');

function pdfii(filename) {
  var self = this;

  pdfii.prototype.getPagesCount = function(cb, callback) {
    var pinfo = new pdfinfo(filename);
    pinfo.getInfo(function(err, info){
      if (err) {
        cb(err);
      } else {
        callback(info);
      }
    });
  };

  pdfii.prototype.getPages = function(filename, pages_count, cb, callback) {
    var pages = {};
    for (var page = 1; page <= pages_count; page++) {
      var ptext = new pdftotext(filename);
      ptext.add_options(['-f ' + page, '-l ' + page]);
      ptext.getText(function(err, data, cmd) {
        if (err) {
          cb(err);
        } else {
          pages[cmd[2]] = data;
          if (Object.keys(pages).length === parseInt(pages_count, 10)) {
            callback(pages, cmd);
          }
        }
      });
    }
  };

  pdfii.prototype.getIndexes = function(pages, pages_count, callback) {
    var indexes = [];
    for (var page = 1; page <= pages_count; page++) {
      var opts = { "section": page};
      var tii = new textii(pages[page]);
      tii.get(opts, function(index) {
        indexes.push(index);
        if (indexes.length === parseInt(pages_count, 10)) {
          callback(indexes);
        }
      });
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
    callback(merged);
  };

  pdfii.prototype.get = function(cb) {
    self.getPagesCount(cb, function(info) {
      var pages_count = info.pages;
      self.getPages(filename, pages_count, cb, function(pages) {
        self.getIndexes(pages, pages_count, function(indexes) {
          self.mergeIndexes(indexes, function(merged_indexes) {
            cb(null, merged_indexes);
          });
        });
      });
    });
  };

}

// module exports
exports = module.exports = function(filename, callback) {
  return new pdfii(filename, callback);
};
