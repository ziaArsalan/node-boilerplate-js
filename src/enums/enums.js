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


module.exports = {
    ENV,
    ReqMethods,
    ResponseStatus
}