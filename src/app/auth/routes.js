const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../enums/enums')

const { SignUpCtrl } = require('./controller')



const Route = () => {
    const routes = [
        {
            method  : ReqMethods.POST,
            url     : '/signup',
            fn      : SignUpCtrl
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