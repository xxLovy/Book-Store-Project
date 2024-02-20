import express from "express"
import { Book } from "../models/bookModels.js"

const router = express.Router()

// Route for Save a new Book
// why '/books' -> '/' ?
router.post('/', async (request, response) => {
    console.log(request.body)
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            console.log(request.body.title)
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }
        const book = await Book.create(newBook)

        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Route for Get All Books from DB
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({})

        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Route for Get One Book from DB by ID
router.get('/:id', async (request, response) => {
    try {
        // request.params ???
        const { id } = request.params
        // other method??
        const book = await Book.findById(id)

        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            console.log(request.body.title)
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }

        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)
        if (!result) {
            response.status(404).send({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'Book updated successfully' })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Route for Delete a Book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)
        if (!result) {
            response.status(404).send({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'Book deleted successfully' })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

export default router