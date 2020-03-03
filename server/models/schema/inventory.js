const mongoose = require('mongoose')
const { Schema } = mongoose

const InventorySchema = new Schema({
	size: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		enum: ['WOMEN', 'MEN'],
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
})

module.exports = InventorySchema
