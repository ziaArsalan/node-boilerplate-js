const { Schema, model } = require('mongoose')
const { UserTypes } = require('../_enums/enums')

const UserSchema = new Schema({
    fullname    :   { type: String, required: true, trim: true },
    email       :   { type: String, required: true, trim: true, unique: true },
    password    :   { type: String, required: true },
    types       :   { type: Array, required: true, default: UserTypes.ADMIN },
    avatar      :   { type: String },
    created     :   { type: Number, default: Date.now() },
    modified    :   { type: Number, default: Date.now() }
})

module.exports = model('User', UserSchema)