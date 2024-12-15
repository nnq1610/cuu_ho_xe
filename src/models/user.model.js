'use strict'

const { model, Schema } = require('mongoose')
const {ObjectId} = require("mongodb");

const DOCUMENT_NAME = 'user';
const COLLECTION_NAME = 'users';


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'rescue'],
        required: true
    },
    address: {
        type: String,
        require: true
    },
    image: { data: Buffer, contentType: String },
}, {
    timestamps : true,
    collection : COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, userSchema)