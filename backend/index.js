import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModels.js"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

// Middleware for parsing request body
// Why this?
app.use(express.json())


// why this?
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors
app.use(cors())
// Option 2: Allow Custon Origins
// app.use(cors({
//     origin: 'http://127.0.0.1:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome')
})

// why use('/books') ?
app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app is connected to DB')
        app.listen(PORT, () => {
            console.log(`App is running in: http://127.0.0.1:${PORT}`)
        })
    }).catch((err) => {
        console.log(err)
    })

