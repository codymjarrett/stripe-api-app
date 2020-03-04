const mongoose = require('mongoose');
const { Schema } = mongoose;
const InventorySchema = require('./inventory')

const shoeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    gender: {
		type: String,
		enum: ['WOMEN', 'MEN', 'UNISEX'],
		required: true,
	},
    inventory: [InventorySchema],
})

const Shoe = mongoose.model('shoe', shoeSchema)

module.exports = Shoe
