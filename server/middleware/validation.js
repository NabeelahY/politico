import Joi from 'joi';


const createParty = Joi.object().keys({
  name: Joi.string().trim().min(3)
    .required(),
  hqaddress: Joi.string().trim().min(3)
    .required(),
  logourl: Joi.string().trim().min(3)
    .required(),
});

const updateParty = Joi.object().keys({
  name: Joi.string().trim().min(3)
    .required(),
});

const createOffice = Joi.object().keys({
  type: Joi.string().trim().min(3)
    .required(),
  name: Joi.string().trim().min(3)
    .required(),
});

const signup = Joi.object().keys({
  firstname: Joi.string().trim().min(3)
    .required(),
  othername: Joi.string().trim().min(3)
    .required(),
  email: Joi.string().email().lowercase().required(),
  phonenumber: Joi.string().trim().min(7)
    .required(),
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
