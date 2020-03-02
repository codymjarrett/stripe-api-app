const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    //! ADD THIS BACK LATER
    // stock: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Inventory',
    // }],
})

const Shoe = mongoose.model('shoe', shoeSchema)

module.exports = Shoe
