module['exports'] = function (options, callback) {
  var user = require('../');
  user.find({ token: options.token }, function(err, _user){
    if (err) {
      return callback(err);
    }
    if (_user.length === 0) {
      return callback(null, false);
    }
    _user[0].status = "active";
    _user[0].save(function(err){
      if (err) {
        callback(err);
      } else {
        callback(null, true);
      }
    });
  })
};
