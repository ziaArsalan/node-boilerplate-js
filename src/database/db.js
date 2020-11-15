const { connect } = require('mongoose')
const config = require('../config/config')

const connectDb = () => {
    const mongooseOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }

    connect(config.mongodb_uri, mongooseOptions)
    .then(() => { console.log('Database connected') })
    .catch(err => { console.log('Error connecting database \n', err) })
}

module.exports = connectDb