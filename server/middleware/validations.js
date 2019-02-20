import Joi from 'joi';


const createParty = Joi.object().keys({
  name: Joi.string().trim().regex(/^[a-z]+$/i).min(3)
    .required()
    .error(() => 'Name is required and should have a minimum of 3 alphabetic characters.'),
  hqaddress: Joi.string().trim().min(3)
    .required(),
  logourl: Joi.string().trim().min(3)
    .required(),
});

const updateParty = Joi.object().keys({
  name: Joi.string().regex(/^[a-z]+/i).min(3).trim()
    .required()
    .error(() => 'Name is required and should have a minimum of 3 alphabetic characters.'),
});

const createOffice = Joi.object().keys({
  type: Joi.string().trim().min(3)
    .required(),
  name: Joi.string().trim().regex(/^[a-z]+$/i).min(3)
    .required()
    .error(() => 'Name is required and should have a minimum of 3 alphabetic characters.'),
});

const signup = Joi.object().keys({
  firstname: Joi.string().trim().regex(/^[a-z]+$/i).min(3)
    .required()
    .error(() => 'First name is required and should have a minimum of 3 alphabetic characters.'),
  othername: Joi.string().trim().regex(/^[a-z]+$/i).min(3)
    .required()
    .error(() => 'Other name is required and should have a minimum of 3 alphabetic characters.'),
  email: Joi.string().email().lowercase().required(),
  phonenumber: Joi.string().trim().regex(/^[0-9]+$/).min(7)
    .required()
    .error(() => 'Phone number is required and should have a minimum of 7 numeric characters.'),
  passporturl: Joi.string().trim().min(3)
    .required(),
  password: Joi.string().min(7).alphanum().required(),
  isadmin: Joi.string(),
});


module.exports = {
  '/parties': createParty,
  '/offices': createOffice,
  '/parties/:id/name': updateParty,
  '/auth/signup': signup,
};
