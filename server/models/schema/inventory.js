const mongoose = require('mongoose')
const { Schema } = mongoose

const inventorySchema = new Schema({
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

const Inventory = mongoose.model('inventory', inventorySchema)

module.exports = Inventory
