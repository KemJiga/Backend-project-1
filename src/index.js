const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
//const mongoose = require('mongoose');

// Settings
dotenv.config();
const PORT = process.env.PORT || 3000;
//const CONNECTION = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongodb';

const app = express();
//require('./config/database');

app.set('port', PORT);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/index',require('./routes/user.routes'));

// Starting the server
const start = async () => {
    try {
        //await mongoose.connect(CONNECTION);
        console.log('Database connected');
        app.listen(app.get('port'), () => {
            console.log(`Server is running on port ${app.get("port")}`);
        });
    } catch (e) {
        console.log(e.message);
    };
};

start();