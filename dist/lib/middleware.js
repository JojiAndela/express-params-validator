"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validate = function validate(req, res, next) {
  var messageFormat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    errors: null,
    message: null,
    status: null
  };
  return options({
    req: req,
    res: res,
    next: next,
    messageFormat: messageFormat,
    errors: []
  });
};

var _default = validate;
exports.default = _default;

var options = function options(validate) {
  return {
    /** isEmail method: 
     * @description check if the string is a valid email
     * optional: supply name of key in body
     * optional: supply variable for message contruction
     * @param  {string} name
     * @param  {string} variable,
     */
    isUUID: function isUUID(param) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(param, " must be a UUID");
      var uuidTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      var params = validate.req.params[param];
      checkAndPush(params && !uuidTest.test(params), message, validate);
    },
    check: function check() {
      if (validate.errors.length > 0) {
        if (validate.messageFormat.status) {
          validate.messageFormat.status = 'error';
        }

        if (validate.messageFormat.data) {
          validate.messageFormat.data.errors = validate.errors;
        } else {
          validate.messageFormat.errors = validate.errors;
        }

        if (!validate.messageFormat.message) {
          validate.messageFormat.message = "invalid parameter(s)";
        }

        return validate.res.status(400).send(validate.messageFormat);
      }

      return validate.next();
    }
  };
};

var checkAndPush = function checkAndPush(condition, message, validate) {
  if (condition) {
    validate.errors.push(message);
  }
}; //   const validateParams = (par, type, arr, notRequired) => (req, res, next) => {
//   const param = req.params[par];
//   const num = !type ? Number(param) : null;
//   if (!param && !notRequired) {
//     return res.status(400).send({
//       message: 'Invalid Parameters',
//       errors: `${par} is required`,
//     });
//   }
//   switch (type) {
//     case 'uuid':
//       if (param && !uuidTest.test(param)) {
//         return res.status(400).send({
//           message: 'Invalid Parameters',
//           errors: `${par} must be a UUID`,
//         });
//       }
//       return next();
//     case 'string':
//       if (param && typeof param !== 'string') {
//         return res.status(400).send({
//           message: 'Invalid Parameters',
//           errors: `${par} must be a string`,
//         });
//       }
//       return next();
//     case 'enum':
//       if (param && !arr.includes(param)) {
//         return res.status(400).send({
//           message: 'Invalid Parameters',
//           errors: `${par} must be one of these => ${arr}`,
//         });
//       }
//       return next();
//     default:
//       if (param && (typeof num !== 'number' || isNaN(num))) {
//         return res.status(400).send({
//           message: 'Invalid Parameters',
//           errors: `${par} must be a number`,
//         });
//       }
//       return next();
//   }
// };
// }