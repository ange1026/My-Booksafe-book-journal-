// Import Dependencies
const express = require('express')
// const { populate } = require('../models/book')
const Book = require('../models/book')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/users/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Book.find({})
	.populate('comments.author', 'username')
		.then(books => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			
			res.render('books/index', { books, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's books
router.get('/mine', (req, res) => {
	
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Book.find({ owner: userId })
		.then(books => {

			res.render('books/index', { books, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('books/new', { username, loggedIn, userId })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
    req.body.haveRead = req.body.haveRead === 'on' ? true : false // NICE ternary ! 
    req.body.owner = req.session.userId
    Book.create(req.body)
    .then(book => {
        
        res.redirect('/books')
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})
// router.post('/', (req, res) => {
// 	req.body.haveRead = req.body.haveRead === 'on' ? true : false

// 	// req.body.owner = req.session.userId
// 	Book.create(req.body)
// 		.then(book => {
// 			// console.log('this was returned from create', book)
// 			const { username, userId, loggedIn } = req.session
// 			res.redirect('/books')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// Edit route -> GET that takes us to the edit form view
router.get("/:id/edit", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId

    const bookId = req.params.id

    Book.findById(bookId)
        .then(book => {
            res.render('books/edit', { book, username, loggedIn, userId })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
        // res.send('edit page')
})

// Update route
router.put('/:id', (req, res) => {
	const bookId = req.params.id
	req.body.haveRead = req.body.haveRead === 'on' ? true : false
	console.log('part1')
	Book.findByIdAndUpdate(bookId, req.body, { new: true })
		.then(book => {
			console.log('part2')
			res.redirect(`/books/${book.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const bookId = req.params.id
	Book.findById(bookId)
		.populate('comments.author', 'username')
		.then(book => {
            const {username, loggedIn, userId} = req.session
			res.render('books/show', { book, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const bookId = req.params.id
	Book.findByIdAndRemove(bookId)
		.then(book=> {
			res.redirect('/books')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
