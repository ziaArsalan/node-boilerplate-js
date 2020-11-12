const Joi = require("joi");

const Signup = Joi.object({
    fullname    : Joi.string().required(),
    email       : Joi.string().email(),
    password    : Joi.string().min(4)
})

module.exports = {
    Signup
}