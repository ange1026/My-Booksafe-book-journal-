// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const booksSchema = new Schema(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
        genre: { type: String, required: true },
		haveRead: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		notes: { type: String, required: true},
		comments: [commentSchema]
	},
	{ timestamps: true }
)

const Book = model('Book', booksSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Book
