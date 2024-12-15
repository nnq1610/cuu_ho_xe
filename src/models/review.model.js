'use strict';

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'review';
const COLLECTION_NAME = 'reviews';

const reviewSchema = new Schema({
    incidentTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'rescueUnit.incidentTypes',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, reviewSchema);
