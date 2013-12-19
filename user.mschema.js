var name = {
  "type": "string",
  "required": true
};

var email = {
  "type": "string",
  "format": "email",
  "required": false
};

var password = {
  "type": "string",
  "format": "password",
  "required": true
};

var user = {
  "properties": {
    "name": name,
    "email": email,
    "password": password,
    "salt": "string",
    "status": {
      "type": "string",
      "enum": ["new", "active", "inactive", "disabled"],
      "default": "new"
    },
    "token": {
      "type": "string",
      "private": true,
      "default": ""
    }
  },
  "methods": {
    "confirm": {
      "input": {
        "token": {
          "type": "string",
          "description": "access token",
          "required": true,
          "message": "access token is required to confirm account"
        }
      }
    },
    "reset": {
      "input": {
        "name": {
          "type": "string",
          "required": true
        }
      }
    },
    "auth": {
      "input": {
        "name": {
          "type": "string",
          "required": true
        },
        "password": {
          "type": "string",
          "required": true
        }
      }
    },
    "signup": {
      "input": {
        "name": name,
        "email": email,
        "password": password,
        "confirmPassword": password
      }
    }
  }
};

module['exports'] = user;