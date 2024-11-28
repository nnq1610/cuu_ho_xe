'use strict'

const { model, Schema } = require('mongoose')
const {ObjectId} = require("mongodb");

const DOCUMENT_NAME = 'incident_type';
const COLLECTION_NAME = 'incident_type';


const incidentTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
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
        province: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        street: { type: String, required: true }
    },
}, {
    timestamps : true,
    collection : COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, incidentTypeSchema)