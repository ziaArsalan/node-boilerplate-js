const ENV = {
    PRODUCTION      : 'production',
    DEVELOPMENT     : 'development'
}
const ReqMethods = {
    GET     : 'get',
    POST    : 'post',
    PUT     : 'put',
    DELETE  : 'delete'
}

const ResponseStatus = {
    SUCCESS         : 200,
    BAD_REQUEST     : 400,
    UNAUTHORIZED    : 401,
    FORBIDDEN       : 403,
    NOT_FOUND       : 404,
    INTERNAL_ERROR  : 500,
}

const ResponseMessages = {
    VALIDATION_ERROR    : 'Invalid or missing field'
}

const UserTypes = {
    MASTER_ADMIN    : 1,
    ADMIN           : 2
}


module.exports = {
    ENV,
    ReqMethods,
    ResponseStatus,
    ResponseMessages,
    UserTypes
}