var loaderUtils = require('loader-utils');
var fs = require('fs-extra');
var path = require('path');
var createToken = require('./createToken');

module.exports = function () {};

module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) this.cacheable();
  this.addDependency(remainingRequest);

  var callback = this.async();
  var extension = path.extname(remainingRequest);
  var options = loaderUtils.getOptions(this);
  var token = createToken(remainingRequest);
  var nextName = token + extension;
  var source = 'module.exports = ' + JSON.stringify(options.urlPath + nextName) + ';';

  if (options.outputDir) {
    fs.copy(
      remainingRequest,
      path.resolve(options.outputDir, nextName),
      function (error) {
        callback(error, source);
      }
    );
  } else {
    callback(null, source);
  }
};
