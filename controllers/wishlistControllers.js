// IMPORT DEPENDENCIES //
const { response } = require('express')
const express = require('express')
const Wishlist = require ('../models/wishlist')

// CREATE ROUTER //
const router = express.Router()

router.get('/', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Wishlist.find({ user: userId })
		.then(wishlist => {
			res.render('wishlist', { wishlist, username, loggedIn })
		})
		.catch(error => {
            console.log(error)
			res.redirect(`/error?error=${error}`)
		})
})

// Create -> POST

router.post('/', (req, res) => {
    const { userId, loggedIn } = req.session
    console.log('hitting post route')
    if (!loggedIn) {
        res.sendStatus(401)
    }

    const payload = {
        wishlist: req.body.wishlist,
        user: userId
    }
     
    Wishlist.create(payload)
        .then(result => {
            console.log(result)
            res.redirect('/wishlist')
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

router.post('/update', (req, res) => {
	const wishlistId = req.body.id
    const isAvailable = req.body.isAvailable;

	Wishlist.findByIdAndUpdate(wishlistId, { isAvailable: isAvailable })
		.then((res) => {
			res.redirect('/wishlist')
		})
		.catch((error) => {
            console.log(error)
			res.redirect(`/error?error=${error}`)
		})
})



// router.delete('/:wishlistId', (req, res) => {
//     const wishlistId = req.params.id
    
//     Wishlist.findByIdAndRemove(wishlistId)
//             .then(wishlist => {
//                 res.redirect(`/wishlist/${wishlist.id}`)
//             })
//             .catch(err => {
//                 response.redirect(`/error?error=${err}`)
//             })
// })

// DELETE
router.delete('/delete/:wishlistId', (req, res) => {
    const wishlistId = req.params.wishlistId
   
    Wishlist.findById(wishlistId)
    // returns the one document found as an object
        .then(wishlistItem => {
            // console.log('after wishlist find the list is', list)
            console.log('wishlistItem.user', wishlistItem.user)
            // console.log('wishlist', list)
            console.log('this is the current user from session', req.session.userId)
            // console.log('List item found', theWishlist)

            if (req.session.loggedIn) {
                if (wishlistItem.user == req.session.userId) {
                    wishlistItem.remove()
                    
                    res.redirect(`/wishlist`)
                }else {
                    const err = 'you%20are%20not%authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                } 
                } else {
                    const err = 'you%20are%20not%authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})
// EXPORT THE ROUTER //
module.exports = router