var crypto = require('crypto');

module['exports'] = function (options, callback) {
  var user = require('../');
  if (options.password.length === 0) {
    return callback(null, "failure");
  }
  user.find({ email: options.email, status: 'active' }, function (err, _user) {
    if (err) {
      return callback(null, "failure");
    }
    if(_user.length === 0) {
      return callback(null, "failure");
    }
    _user = _user[0];
    // user was found, now compare password
    var hash = crypto.createHmac("sha512", _user.salt).update(options.password).digest("hex");
    if (hash === _user.password) {
      return callback(null, "success");
    } else {
      return callback(null, "failure");
    }
  })
};