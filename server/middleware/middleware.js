// Middleware file gotten from scotch.io

import _ from 'lodash';
import Joi from 'joi';
import Schemas from './validations';

module.exports = (useJoiError = false) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

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
              status: 'failed',
              error: 'Invalid request data. Please review request and try again.',
            };

            // Send back the JSON error response
            res.status(400).json(_useJoiError ? JoiError : CustomError);
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
