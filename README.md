# express-params-validator
a middleware to validate express params on a route

# Installation
```bash
npm install express-params-validator
```
or 
```bash
yarn add express-params-validator
```

Also make sure that you have Node.js 6 or newer in order to use it.

# How to use

```javascript
import { middleware } from 'express-params-validator';

const paramValidator = (req, res, next) => {
  const valid = middleware(req, res, next);
  valid
    .isEnum('type', ['email', 'number'])
    .isUUID('id')
    .isNumber('phone')
    .check();
};



export { paramValidator };

```
then you can use it in the express router like this

``` javascript
import express from 'express';
import message from '../controllers/message';
import { paramValidator } from '../middlewares/validator';

const { getMessage } = message;

const router = express.Router();

router.post('/messag/:id/:type/:phone', paramValidator, getMessage);

export default router;
```
and get errors as 
```json
{
  "errors": [
      "id must be a UUID",
      "phone must be a number",
      "type must be be one of these: email,number"
    ],
    "message": "Invalid Parameter(s)"
}
```

To use custom error output
``` javascript
const paramValidator = (req, res, next, {
  error: true,
  message: 'there is an error',
  data: {}
}) => {
  const valid = middleware(req, res, next);
  valid
    .isEnum('type', ['email', 'number'])
    .isUUID('id')
    .isNumber('phone')
    .check();
};

```
and get an error similar to 

```json
{ 
  "error" : true,
  "message": "there is an error",
  "data": {"errors": [
      "id must be a UUID",
      "phone must be a number",
      "type must be be one of these: email,number"
    ]
  }
}
```

# Changelog
Check the [GitHub Releases page](https://github.com/JojiAndela/express-params-validator/releases).

# Contributing
Bug reports and pull requests are welcome on GitHub at [https://github.com/jojiAndela/express-params-validator](https://github.com/jojiAndela/express-params-validator). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

# License
MIT License
