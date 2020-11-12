const middleware = '/api/v1/'
const Auth = require("./auth/routes")

const initializeEndpoints = (app) => {
    app.use(middleware + 'auth', Auth)
};

module.exports = initializeEndpoints;
