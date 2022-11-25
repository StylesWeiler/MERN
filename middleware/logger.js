const { format } = require('date-fns')
const { v4: uuid } = require('uuid') // renaming v4 to uuid
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async(message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}` // datetime var using format specficed 
    const logItem = `${dateTime}\t${uuid()}\t${message}\n` // logItem that receives datetime and tabs the logs for future use as well as the uuid and message

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs')) // checks for the directory and creates it if it doesn't yet exist 
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    }catch (err){
        console.log(err)
    }
}

// MIDDLEWARE
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.header.origin}`, 'reqLog.log') // logs every request that comes in (FUTURE: build it out to take only our requests
    console.log(`${req.method} ${req.path}`) // useful for future development to tell where logs are coming from
    next()
}

module.exports = { logEvents, logger } // error handler