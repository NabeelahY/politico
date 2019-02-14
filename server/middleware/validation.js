import Joi from 'joi';

export default {

  createParty: {
    body: {
      name: Joi.string().regex(/^[A-Z]+/i).trim().min(3)
        .required(),
      hqaddress: Joi.string().trim().min(3)
        .required(),
      logourl: Joi.string().trim().min(3)
        .required(),
    },
  },

  updateParty: {
    body: {
      name: Joi.string().regex(/^[A-Z]+/i).trim().min(3)
        .required(),
    },
  },

  createOffice: {
    body: {
      type: Joi.string().regex(/^[A-Z]+/i).trim().min(3)
        .required(),
      name: Joi.string().regex(/^[A-Z]+/i).trim().min(3)
        .required(),
    },
  },

  signup: {
    body: {
      firstname: Joi.string().regex(/^[A-Z]+/i).trim().min(3)
        .required(),
      othername: Joi.string().regex(/^[A-Z]+/i).trim().min(3)
        .required(),
      email: Joi.string().email().lowercase().required(),
      phonenumber: Joi.string().regex(/^[0-9]+/).trim().min(7)
        .required(),
      password: Joi.string().min(7).alphanum().required(),
      isadmin: Joi.string(),
    },
  },
};
