module.exports = process.env.PDFII_COV
  ? require('./lib-cov/pdfii')
  : require('./lib/pdfii');

