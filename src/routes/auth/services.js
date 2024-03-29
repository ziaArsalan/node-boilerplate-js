const User = require('../../model/user')
const { generateToken, verifyPass } = require('../../_utils/guard')
const { ServiceHandler } = require('../../_utils/handler')
const Responses = require('./responses')

const SignUpService = async (user) => {
    const result = await User.create(user)

    if(!result)
    throw {message: Responses.SignupResponse.ERROR}

    const newUser = result.toJSON()

    delete newUser.password
    newUser.token = generateToken({ _id: newUser._id, email: newUser.email }, '1d')

    return {
        success : true,
        message : Responses.SignupResponse.CREATED,
        data    : newUser
    }
}

const LoginService = async (reqDate) => {
    const result = await User.findOne({email: reqDate.email})
    if(!result)
    return {
        success : false,
        message : Responses.LoginResponse.USER_NOT_FOUND
    }

    const user = result.toJSON()

    if(!verifyPass(reqDate.password, user.password))
    return {
        success : false,
        message : Responses.LoginResponse.PASS_MISMATCH
    }

    delete user.password
    user.token = generateToken({ _id: user._id, email: user.email }, '1d')

    return {
        success : true,
        message : Responses.LoginResponse.LOGGEDIN,
        data    : user
    }
}

const SignUpServiceV2 = async (req) => {
    const result = await User.create(req.user)

    if(!result)
    throw {message: Responses.SignupResponse.ERROR}

    const newUser = result.toJSON()

    delete newUser.password
    newUser.token = generateToken({ _id: newUser._id, email: newUser.email }, '1d')

    return {
        success : true,
        message : Responses.SignupResponse.CREATED,
        data    : newUser
    }

}

module.exports = {
    SignUpService,
    LoginService,
    SignUpServiceV2 : (req, res) => ServiceHandler(SignUpServiceV2, req, res),
}