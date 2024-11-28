const { model, Schema } = require('mongoose')
const {ObjectId} = require("mongodb");

const DOCUMENT_NAME = 'rescue_unit';
const COLLECTION_NAME = 'rescues_unit';
const rescueUnitSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'IncidentType',
        price: {
            type: Number,
            required: true
        }
    }],
    rating: {
        type: Number,
        default: 0
    },
    activeStatus: {
        type: Boolean,
        default: true // Để bật/tắt trạng thái hoạt động
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps : true,
    collection : COLLECTION_NAME
});


// Export the model
module.exports = model('RescueUnit', rescueUnitSchema);
