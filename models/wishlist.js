// import dependencies
const mongoose = require ('./connection')

const  { Schema, model } = mongoose

const listSchema = new Schema({// this is V2 goodness, but in your main branch checkout to a new branch for developing new features now that you've hit mvp and the app is deployed - wouldn't want to break it ! 
    wishlist: { //if this is a list, shouldn't it be an array ? ( it should be an array )
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

// export model
module.exports = Wishlist