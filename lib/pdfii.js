
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
    var pdftotext = require('pdftotextjs');
    var pages = {};
    for (var page = 1; page <= pages_count; page++) {
      var ptext = new pdftotext(filename);
      ptext.add_options(['-f ' + page, '-l ' + page]);
      ptext.getText(function(err, data, cmd) {
        pages[parseInt(cmd[2])] = data;
        if (Object.keys(pages).length === parseInt(pages_count)) {
          callback(err, pages, cmd);
        };
      });
    }
  };

  pdfii.prototype.getIndex = function(pages, pages_count, callback) {
    var textii = require('textiijs');
    for (var page = 1; page <= pages_count; page++) {
      tii = new textii(pages[page], null, function(err, data) {
        callback(data);
      });
    }
  };

  pdfii.prototype.get = function(opts) {
    self.getPagesCount(function(err, info) {
      var pages_count = info.pages;
      self.getPages(filename, pages_count, function(err, pages) {
        self.getIndex(pages, pages_count, function(index) {
           callback(err, index);
        });
      });
    });
  };

}

// module exports
exports = module.exports = function(filename, options, callback) {
  return new pdfii(filename, options, callback);
};
