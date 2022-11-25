require('dotenv').config() // allows for the use of environment variables 
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger') // brings in our logger
const errorHandler = require('./middleware/errorHandler') // brings in our error handler
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 8080

console.log(process.env.NODE_ENV)

app.use(logger)

app.use(cors(corsOptions)) //makes the API available publicly

app.use(express.json()) // app can receive and parse json objects

app.use(cookieParser()) // third party middleware

app.use('/', express.static(path.join(__dirname, 'public')))
// dirname says look inside the folder we are currently in
// express is a middleware that prepares the request for the API 
app.use('/', require('./routes/root'))



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
}) // catch all for requests 

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))



