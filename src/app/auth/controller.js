const { ResponseStatus } = require("../../enums/enums");
const { userVld } = require("../../validations");
const Responses = require('./responses')

const SignUpCtrl = async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await userVld.Signup.validateAsync({email, password})

        console.log(user);

        return res.status(ResponseStatus.SUCCESS).send({
            success : true,
            message : Responses.SignupResponse.CREATED
        })

    } catch (error) {
        console.log('Signup - ERROR', error);

        return res.status(ResponseStatus.INTERNAL_ERROR).send({
            success : false,
            message : Responses.SignupResponse.ERROR,
            error   : error.message
        })
    }
}

module.exports = {
    SignUpCtrl
}