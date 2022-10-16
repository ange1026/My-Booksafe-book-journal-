const mongoose = require ('./connection')

const  { Schema, model } = mongoose

const listSchema = new Schema({
    wishlist: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: false,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const Wishlist = model("Wishlist", listSchema)


module.exports = Wishlist