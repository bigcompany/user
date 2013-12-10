module['exports'] = function (options, callback) {
  var user = require('../');
  if (options.password !== options.confirmPassword) {
    return callback(new Error('Passwords do not match'));
  }
  user.create(options, function (err, result){
    if (err) {
      return callback(err);
    }
    return callback(null, { name: options.name, email: options.email });
  });
};