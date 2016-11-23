var uuid = require('uuid');

module['exports'] = function (options, callback) {
  var user = require('../');
  user.find(options.query, function(err, users){
    if (err) {
      return callback(err);
    }
    if (users.length === 0) {
      return callback(new Error('invalid'));
    }
    var u = users[0];
    // if user was found, check to see if they have an email
    if (typeof u.email === "undefined" || u.email.length === 0) {
      // else, no email was found, no password can be reset
      return callback(new Error('email-missing'));
    }
    u.token = uuid();
    u.save(function(err, result){
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  });
};