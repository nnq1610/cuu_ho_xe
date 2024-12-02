const { model, Schema } = require('mongoose')
const {ObjectId} = require("mongodb");

const DOCUMENT_NAME = 'review';
const COLLECTION_NAME = 'reviews';

const reviewSchema = new Schema({
    rescueUnitId: {
        type: Schema.Types.ObjectId,
        ref: 'RescueUnit',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
}, {
    timestamps : true,
    collection : COLLECTION_NAME
});

// Export the model
module.exports = model(DOCUMENT_NAME, reviewSchema);
