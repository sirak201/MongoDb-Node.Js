const Joi = require("@hapi/joi");

const userValidation = data => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(6)
      .required(),
    username: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .email()
      .required()
  });

  return schema.validate(data);
};

module.exports.userValidation = userValidation;
