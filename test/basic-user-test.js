var tap = require("tap");

var user = require('../'),
    id = null,
    password = "abc123",
    token = null;

tap.test('can persist user resource to memory', function (t) {
  user.persist('memory');
  t.end('user persisted to memory');
});

tap.test('can signup a new user', function (t) {
  user.signup({ name: "marak", email: "test@marak.com", "password": password, "confirmPassword": password }, function (err, result) {
    t.equal(err, null);
    t.equal(result.name, "marak");
    t.equal(result.email, "test@marak.com");
    t.end();
  })
});

tap.test('can get new user', function (t) {
  user.find({ name: "marak" }, function (err, result) {
    t.equal(err, null);
    token = result[0].token;
    id = result[0].id;
    t.end();
  })
});

tap.test('attempt to auth with "new" user', function (t) {
  user.auth({ name: "marak", password: password }, function (err, result){
    t.equal(err, null);
    t.equal(result, "failure");
    t.end();
  })
});

tap.test('confirm "new" user by token', function (t) {
  user.confirm({ token: token }, function(err, result){
    t.equal(err, null);
    t.equal(result, "success");
    t.end();
  })
});

tap.test('attempt to auth with "active" user', function (t) {
  user.auth({ name: "marak", password: password }, function (err, result){
    t.equal(err, null);
    t.equal(result, "success");
    t.end();
  })
});

tap.test('attempt to auth with "active" user - wrong password', function (t) {
  user.auth({ name: "marak", password: "foo" }, function (err, result){
    t.equal(err, null);
    t.equal(result, "failure");
    t.end();
  })
});

tap.test('attempt to auth with "active" user - empty password', function (t) {
  user.auth({ name: "marak", password: "" }, function (err, result) {
    t.type(err, Object);
    t.end();
  })
});

tap.test('reset access token for "active" user', function (t) {
  user.reset({ name: "marak" }, function(err, result){
    t.equal(err, null);
    user.get({ id: id }, function(err, _user){
      t.equal(err, null);
      t.notEqual(result.token, token);
      t.type(result, "object");
      t.end();
    });
  });
});