const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../enums/enums')

const { SignUpCtrl, LoginCtrl } = require('./controllers')
const { ApiErrorHandler } = require('../../utils/handler')


const Route = () => {
    const routes = [
        {
            method  : ReqMethods.POST,
            url     : '/signup',
            fn      : ApiErrorHandler(SignUpCtrl)
        },
        {
            method  : ReqMethods.POST,
            url     : '/login',
            fn      : ApiErrorHandler(LoginCtrl)
        }
    ]

    for (var route of routes) {
        const { method, url, auth, fn } = route
        
        if (auth) router[method](url, auth, fn)
        else router[method](url, fn)
    }

    return router
}

module.exports = Route()