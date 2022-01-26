const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../_enums/enums')
const { userVld }    = require("../../_validations")

const controllers = require('./controllers')
const services = require('./services')

const { ApiErrorHandler } = require('../../_utils/handler')
const { Authenticate, Validate } = require('../../lib/auth/auth.services')


const Route = () => {
    const routes = [
        {
            method      : ReqMethods.POST,
            url         : '/signup',
            middlewares : [Validate(userVld.Signup, 'body')],
            fn          : ApiErrorHandler(services.SignUpServiceV2)
        },
        {
            method      : ReqMethods.POST,
            url         : '/login',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.LoginCtrl)
        }
    ]

    for (var route of routes) {
        const { method, url, middlewares, fn } = route
        
        router[method](url, ...middlewares, fn)
    }

    return router
}

module.exports = Route()