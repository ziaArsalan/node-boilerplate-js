const Joi = require("joi");

const Signup = Joi.object({
    fullname    : Joi.string().required(),
    email       : Joi.string().email(),
    password    : Joi.string().min(8),
    avatar      : Joi.string(),
})

const Login = Joi.object({
    email       : Joi.string().email(),
    password    : Joi.string().min(8),
})

module.exports = {
    Signup,
    Login
}