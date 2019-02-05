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
  name: Joi.string().trim().min(3).alphanum()
    .required(),
});


module.exports = {
  '/parties': createParty,
  '/offices': createOffice,
  '/parties/:id/name': updateParty,
};
