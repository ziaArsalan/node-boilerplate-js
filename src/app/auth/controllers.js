const { ResponseStatus, ResponseMessages, UserTypes } = require("../../enums/enums")
const { userVld } = require("../../validations")
const { SignUpService, LoginService } = require('./services')
const Responses = require('./responses')
const { getUniqueId } = require("../../utils/utils")
const { generatePassHash } = require("../../utils/guard")

const SignUpCtrl = async (req, res) => {
    try {

        const { error, value } = await userVld.Signup.validate(req.body)

        if(error)
        return res.status(ResponseStatus.BAD_REQUEST).send({
            success : false,
            message : ResponseMessages.VALIDATION_ERROR,
            error   : error.message
        })

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

    } catch (error) {
        console.log('Signup - ERROR', error);

        return res.status(ResponseStatus.INTERNAL_ERROR).send({
            success : false,
            message : Responses.SignupResponse.ERROR,
            error   : error.message
        })
    }
}

const LoginCtrl = async (req, res) => {
    try {

        const {error, value} = userVld.Login.validate(req.body)

        if(error)
        return res.status(ResponseStatus.BAD_REQUEST).send({
            success : false,
            message : ResponseMessages.VALIDATION_ERROR,
            error   : error.message
        })

        const result = await LoginService(value)

        if(!result.success)
        return res.status(ResponseStatus.BAD_REQUEST).send(result)

        return res.status(ResponseStatus.SUCCESS).send(result)

    } catch (error) {
        console.log('Login - ERROR', error);

        return res.status(ResponseStatus.INTERNAL_ERROR).send({
            success : false,
            message : Responses.LoginResponse.ERROR,
            error   : error.message
        })
    }
}


module.exports = {
    SignUpCtrl,
    LoginCtrl
}