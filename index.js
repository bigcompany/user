var resource = require('resource'),
    crypto = require('crypto'),
    uuid = require('node-uuid');

var user = resource.define('user', { 
  controller: require('./lib/'), 
  schema: require('./user.mschema')
});

//
// Setup resource hooks
//
user.before('create', function (data, next) {
  // check that user name is available
  user.find({ name: data.name }, function(err, result){
    if (err) {
      return next(err);
    }
    if (result.length >= 1) {
      return next(new Error('user name is unavailable.'));
    }
    return next(null, data)
  });
});

user.before('create', function (_user, next) {
  if (typeof _user.password === 'undefined') {
    // if no password is present at the time of user creation, create a default password
    _user.password = uuid();
  }
  next(null, _user);
});

user.before('update', function (_user, next) {
  if (typeof _user.password !== 'undefined' && _user.password.length > 0) {
    // all user passwords are stored as hashes with unique salts
    crypto.randomBytes(64, function(ex, buf) {
      if (ex) throw ex;
      // generate a new salt everytime a password is saved
      _user.salt = buf.toString("base64");
      var hash = crypto.createHmac("sha512", _user.salt).update(_user.password).digest("hex");
      // store the password as a hash of the original password using a randomly generated salt
      _user.password = hash;
      next(null, _user);
    });
  } else {
    next(null, _user);
  }
});

user.before('create', function (_user, next) {
  // generate a new UUID for the account's access token
  _user.token = uuid();
  // all user passwords are stored as hashes with unique salts
  crypto.randomBytes(64, function(ex, buf) {
    if (ex) throw ex;
    // generate a new salt everytime a password is saved
    _user.salt = buf.toString("base64");
    var hash = crypto.createHmac("sha512", _user.salt).update(_user.password).digest("hex");
    // store the password as a hash of the original password using a randomly generated salt
    _user.password = hash;
    next(null, _user);
  });
});

module['exports'] = user;