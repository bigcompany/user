var uuid = require('node-uuid');

module['exports'] = function (options, callback) {
  var user = require('../');
  user.find({ name: options.name }, function(err, _user){
    if (err) {
      return callback(err);
    }
    if(_user.length === 0) {
      return callback(new Error('failure'));
    }
    var record = _user[0];
    record.token = uuid();
    record.save(function(err, result){
      if (err) {
        return callback(err, 'failure');
      }
      return callback(null, record);
    });
  });
};