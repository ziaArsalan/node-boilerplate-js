const SignupResponse = {
    CREATED             : 'user successfully created',
    ERROR               : 'error creating user',
}

const LoginResponse = {
    LOGGEDIN            : 'user successfully login',
    USER_NOT_FOUND      : 'user not found',
    PASS_MISMATCH       : 'password mismatch',
    ERROR               : 'error loging in the user',
}


module.exports = {
    SignupResponse,
    LoginResponse
}