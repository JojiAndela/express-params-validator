const validate = (req, res, next, messageFormat = {
  errors: null,
  message: 'invalid parameter(s)',
  status: 'error'
}) => options({
  req, res, next, messageFormat, errors: [],
});

export default validate;

const options = validate => ({
  /** isEmail method: 
   * @description check if the string is a valid email
   * optional: supply name of key in body
   * optional: supply variable for message contruction
   * @param  {string} name
   * @param  {string} variable,
   */
  
  isUUID: (param, message= `${param} must be a UUID`) => {
    const uuidTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const params = validate.req.params[param];
    checkAndPush(
      params && !uuidTest.test(params),
      message,
      validate
    );
    return options(validate);
},

isNumber: (param, message= `${param} must be a number`) => {
  const params = validate.req.params[param];
  checkAndPush(
    params && isNaN(params),
    message,
    validate
  )
  return options(validate);
},

isEnum: (param, array, message=`${param} must be be one of these: ${array}`) => {
  const params = validate.req.params[param];

  checkAndPush(
    params && !array.includes(params),
    message,
    validate
  );
  return options(validate);
},


check: () => {
  if (validate.errors.length > 0) {

    if(validate.messageFormat.data){
        validate.messageFormat.data.errors = validate.errors;
    } else {
      validate.messageFormat.errors = validate.errors;
    }

    return validate.res.status(400).send(validate.messageFormat);
  }
  return validate.next();
},

});

const checkAndPush = (condition, message, validate) => {
  if(condition) {
    validate.errors.push(message);
  }
};