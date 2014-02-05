# User Resource

User management system at your fingertips.

## Install

Pending npm publication use the repo's url
```shell
npm install https://github.com/bigcompany/resource-user/tarball/master --save
```

## Quick Start

Require and define the persistency adapter.

```js
var user = require('resource-user');

// use memory store
user.persist('memory');
```

## API

### user.signup(udo, callback)

* **udo** `Object` User Data Object, an Object literal.
* **callback** `Function(?Error, Object)` the callback, provides the UDO.

```js
// the expected User Data Object
var udo = {
  name: 'marak',
  email: 'test@marak.com',
  password: password,
  confirmPassword: password,
};

user.signup(udo, function (err, result) {
  err === null;
  result.name === 'marak';
  result.email === 'test@marak.com';
  // The result.token property contains a unique token to be used
  // for email verification
  sendVerificiationEmail(result.email, result.token);
});
```

### user.auth(credentials, callback)

* **credentials** `Object` An Object literal containing the `password` property and a unique identifier.
* **callback**: `Function(?Error, string)` the callback, responds with `success` or `failure`.

Logins / Authenticates a user. A newly created user is not verified, thus cannot authenticate.

```js
user.auth({ name: 'marak', password: password }, function (err, result) {
  err === null;

  // if the user was verified the result would have a value of "success"
  result === 'failure';
});
```

### user.confirm(tokenObj, callback)

* **tokenObj** `Object` An Object literal containing a `token` property with the token value.
* **callback**: `Function(?Error, string)` the callback, responds with `success` or `failure`.

Confirms a user has verified.

```js
user.confirm({ token: token }, function(err, result) {
  err === null;
  result === 'success';
});
```


### user.find(query, callback)

* **query** `Object` An Object literal containing properties and values to query for.
* **callback** `Function(?Error, Array.<Object>)` the callback, provides an array of UDOs.

```js
user.find({ name: 'marak' }, function (err, result) {
  err === null;

  Array.isArray(result) === true;

  var udo = result[0];

  udo.name === 'marak';

  t.equal(err, null);
  token = result[0].token;
  id = result[0].id;
  t.end();
});
```

### user.reset(query, callback)

Reset the verification token.

* **query** `Object` An Object literal containing properties and values to query for, result must be a single user.
* **callback** `Function(?Error, Object)` the callback, provides the updated UDO.

```js
user.reset({ name: 'marak' }, function(err, udo) {
  udo.token !== oldToken;
});
```


## Release History
- **v0.0.5**, *TBD*
    - Bing Bang

## License
Copyright 2013 Marak

Licensed under the [MIT License](LICENSE-MIT)
