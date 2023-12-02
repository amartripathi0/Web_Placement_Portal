const mongoose = require('mongoose')

async function connectToMongoDB(url) {
    mongoose.connect(url)
}

module.exports = connectToMongoDB