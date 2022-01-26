const { ResponseStatus, UserTypes }   = require("../../_enums/enums")
const { userVld }                     = require("../../_validations")
const { SignUpService, LoginService } = require('./services')
const Responses                       = require('./responses')
const { getUniqueId }                 = require("../../_utils/utils")
const { generatePassHash }            = require("../../_utils/guard")
const { ValidationrHandler }          = require('../../_utils/handler')

const SignUpCtrl = async (req, res) => {

    const {invalid, value} = ValidationrHandler(userVld.Signup, req.body, res)

    if(invalid) return invalid()

    const user = {
        uuid        : getUniqueId(16),
        email       : value.email,
        fullname    : value.fullname,
        avatar      : value.avatar,
        password    : generatePassHash(value.password),
        types       : [UserTypes.ADMIN]
    }

    const result = await SignUpService(user)

    return res.status(ResponseStatus.SUCCESS).send(result)
}

const LoginCtrl = async (req, res) => {
    const { invalid, value } = ValidationrHandler(userVld.Login, req.body, res)

    if(invalid) return invalid()

    const result = await LoginService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}


module.exports = {
    SignUpCtrl,
    LoginCtrl
}