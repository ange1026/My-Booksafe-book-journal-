// IMPORT DEPENDENCIES //
const express = require('express')
const Book = require ('../models/book')

// CREATE ROUTER //
const router = express.Router()


// ROUTES //

// POST -> only loggedIn users can post comments
router.post('/:bookId', (req, res) => {
    const bookId = req.params.bookId

    if (req.session.loggedIn) {
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
     
    Book.findById(bookId)
        .then(book => {
            book.comments.push(req.body)
            return book.save()
        })
        .then(book => {
            res.redirect(`/books/${book.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})
// no update ?
// DELETE -> only th author of the comment can delete it.
router.delete('/delete/:bookId/:commId', (req, res) => {
    const bookId = req.params.bookId
    const commId = req.params.commId

    Book.findById(bookId)
        .then(book => {
            console.log('book', book)
            const theComment = book.comments.id(commId)
            console.log('comment found', theComment)

            if (req.session.loggedIn) {// consolidate this block by using && since the error codes are the same 
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    book.save()
                    res.redirect(`/books/${book.id}`)
                }else {
                    const err = 'you%20are%20not%authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                } 
                } else {// careful of the indentation here
                    const err = 'you%20are%20not%authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// EXPORT THE ROUTER //
module.exports = router