var fnv = require('fnv');

module.exports = function (path) {
  var h = new fnv.FNV();
  h.update(Buffer(path));
  return h.digest('hex');
}