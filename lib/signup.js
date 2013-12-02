module['exports'] = function (options, callback) {
  var user = require('../');
  if (options.password !== options.confirmPassword) {
    return callback(null, 'failure');
  }
  user.create(options, function(err, result){
    if (err) {
      return callback(err, 'failure');
    }
    return callback(null, 'success');
  });
};