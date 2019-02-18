// Middleware file gotten from scotch.io

import _ from 'lodash';
import Joi from 'joi';
import Schemas from './validations';

module.exports = () => {

  // enabled HTTP methods for request data validation
  const _supportedMethods = ['post', 'patch'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
  };

  // return the validation middleware
  return (req, res, next) => {

    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      // get schema for the current route
      const _schema = _.get(Schemas, route);

      if (_schema) {
        // Validate req.body using the schema and validation options
        return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
          if (err) {
            // Joi Error
            const JoiError = {
              status: 400,
              message: err.details.map(msg => (msg.message.replace(/['"]/g, ''))),
            };

            // Custom Error
            const CustomError = {
              status: 400,
              message: err.details.map(msg => (msg.message.replace(/['"]/g, '')))[0],
            };

            // Send back the JSON error response
            res.status(400).json(err.details.map(msg => (msg.context.key))[0] === 'name'
              || err.details.map(msg => (msg.context.key))[0] === 'firstname'
              || err.details.map(msg => (msg.context.key))[0] === 'othername'
              || err.details.map(msg => (msg.context.key))[0] === 'phonenumber' ? CustomError : JoiError);
          } else {
            // Replace req.body with the data after Joi validation
            req.body = data;
            next();
          }
        });
      }
    }

    next();
  };
};
