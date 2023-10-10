const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const CONNECTION = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongodb';

mongoose.connect(CONNECTION)
    .then(db => console.log('Database connected'))
    .catch(err => console.log(err.message));