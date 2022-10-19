// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user') // unused import

const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const booksSchema = new Schema(
	{   // inconsistent indentation here, pick one format and stick with it v
		title: { type: String, required: true },
		author: { type: String, required: true },
        genre: { type: String, required: true },
		haveRead: { type: Boolean, required: true },
		owner: {// < i prefer it like this 
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		review: { type: String, required: false },
		comments: [commentSchema]
	},
	{ timestamps: true }
)

const Book = model('Book', booksSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Book
