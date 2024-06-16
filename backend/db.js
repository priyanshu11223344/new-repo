const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNoteBook";

const connectToMongo = async () => {
 mongoose.connect(mongoURI, await console.log("Connected to mongo Successfuly")
    );
}

module.exports = connectToMongo;