const express = require('express')
const compression = require('compression')
const cors = require('cors')
const path = require('path')

const env = require('./src/_config/config')
const connectDb = require('./src/database/db')
const endpoints = require('./src/routes')

const app = express()

// Connect to Database
// connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: false, limit: '50mb'}))
app.use(compression())
app.use(cors(env.corsOption))
app.use(express.static(path.join(__dirname, 'build')))
app.set('view engine', 'ejs')

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

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandeled Rejection\n ", err);
});
  
process.on("uncaughtException", (err) => {
    console.log("Uncaught Rejection\n ", err);
});