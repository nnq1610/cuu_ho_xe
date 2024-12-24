'use strict';

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'rescueUnit';
const COLLECTION_NAME = 'rescueUnits';

const rescueUnitSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    incidentTypes: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                default: ''
            },
            vehicleType: {
                type: String,
                // required: true
            },
            price: {
                type: Number,
                // required: true
            },
            address: {
                type: String,
                require: true
            },
            image: {
                type: String,
                default: ''
            }
        }
    ],
    activeStatus: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, rescueUnitSchema);
