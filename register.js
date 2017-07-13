var createToken = require('./createToken');

module.exports = function(extensions, options) {
  extensions.forEach(function(ext) {
    require.extensions[ext] = function(module, filename) {
      var token = createToken(filename);
      var nextName = token + ext;
      module._compile('module.exports = ' + JSON.stringify(options.urlPath + nextName) + ';', filename);
    }
  });
}
