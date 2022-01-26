const enums                                = require('../_enums')
// const logging                              = require('./logging')
const { ResponseStatus, ResponseMessages } = require('../_enums')

const ApiErrorHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            console.log(req.originalUrl + ' - ERROR ', err);
            
            // Generate logs
            logging.ApiErrorLog(req, res, err)

            return res.status(enums.ResponseStatus.INTERNAL_ERROR).send({
                success : false,
                message : enums.ResponseMessages.INTERNAL_ERROR,
                error   : err.message 
            })
        })
    }
}

const EmailHandler = (fn) => {
    return (data) => {
        return fn({...data}).then(res => {
            // logging.EmailErrorLog(data, res, null) You can generate logs here
            return res
        }).catch(err => {
            console.log(`Sending ${data.service} Email - ERROR`, err);
            // logging.EmailErrorLog(data, null, err)
            return {
                success : false,
                message : 'Error sending email',
                error   : err.message
            }
        })
    }
}

/**
 * 
 * @param {Object} schema - The valid data schema
 * @param {Object} data - The data object that needs to be verify
 * @param {Object} res - The controller response param
 * 
 */
const ValidationrHandler = (schema, data, res) => {
    const { error, value } = schema.validate(data)

    if(!error)
    return {
        value
    }

    return {
        invalid: () => {
            return res.status(ResponseStatus.BAD_REQUEST).send({
            success : false,
            message : ResponseMessages.VALIDATION_ERROR,
            error   : error.message
        })}
    }
}

/**
 * 
 * @param {Function} fn - The service function
 * @param {Object} data - The data object that needs to be pass in the service function
 * @param {Object} res - The controller response param
 * 
 */

const ServiceHandler = async (fn, data, res) => {
    const result = await fn(data)

    if(!result.success)
    return res.status(enums.ResponseStatus.BAD_REQUEST).send(result)

    return res.status(enums.ResponseStatus.SUCCESS).send(result)
}

module.exports = {
    ApiErrorHandler,
    EmailHandler,
    ValidationrHandler,
    ServiceHandler
}