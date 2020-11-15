const express = require('express')
const compression = require('compression')
const cors = require('cors')

const env = require('./config/config')
const connectDb = require('./database/db')
const endpoints = require('./app')

const app = express()

// Connect to Database
connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: false, limit: '50mb'}))
app.use(compression())
app.use(cors(env.corsOption))

// app.options('*', cors(env.corsOption))
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin,Content-Type,x-auth-user,x-amz-meta-fieldname,x-auth-token");
//     next();
// });


app.listen(env.port, () => {
    console.log('Server is listening at', env.port, 'with env', process.env.NODE_ENV);
})

endpoints(app)

process.on("unhandledRejection", (err) => {
    console.log("Unhandeled Rejection\n ", err);
});
  
process.on("uncaughtException", (err) => {
    console.log("Uncaught Rejection\n ", err);
});