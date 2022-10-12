
const mongoose = require('./connection')
const Book = require("./book")


const db = mongoose.connection


db.on('open', () => {

const startBooks = [
    { title: 'The Little Prince', author: 'Antoine de Saint-Exupery', genre: 'Fiction', haveRead: true},
    { title: 'Little Women', author: 'Louisa May Alcott', genre: 'Novel', haveRead: true},
    { title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Satire', haveRead: true},
    { title: 'Pride and Predujice', author: 'Jane Austen', genre: 'Romance', haveRead: false},
    { title: 'They Both Die at the End', author: 'Adam Silvera', genre: 'Fiction', haveRead: false},
    { title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', genre: 'Novel', haveRead: true},
    { title: 'The Sun and Her Flowers', author: 'Rupi Kaur', genre: 'Poetry', haveRead: true},
    { title: 'Every Last Fear', author: 'Alex Finlay', genre: 'Thriller', haveRead: false},
    { title: 'The Wives', author: 'Tarryn Fisher', genre: 'Thriller', haveRead: true},
    { title: 'The Song of Achilles', author: 'Madeline Miller', genre: 'Novel', haveRead: false},
]
  
    Book.deleteMany({ owner: null })
        .then(deletedBooks => {
            console.log('this is what .deleteMany returns', deletedBooks)

            Book.create(startBooks)
                .then(data => {
                    console.log('here are the newly created books', data)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
        .catch(error => {
            console.log(error)
            db.close()
        })
})