const allowedOrigins = require('./allowedOrigins')

// third party middleware
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){ // only origins in the array can access our REST API (the second condition allows Postman)
            callback(null, true) // null for the error param and true for the successful param
        } else {
            callback(new Error('Not allowed by CORS')) // sends back an error object
        }
    }, 
    credentials: true, 
    optionsSuccessStatus: 200 // no problems accessing API for different types of allowed origins
}

module.exports = corsOptions