const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
// const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Settings
dotenv.config();
const PORT = process.env.PORT || 3000;
// const CONNECTION = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongodb';

const app = express();
// require('./config/database');

app.set('port', PORT);
app.set('json spaces', 2);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/restaurants', require('./routes/restaurant.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/deliveries', require('./routes/delivery.routes'));

// Starting the server
const start = async () => {
  try {
    //await mongoose.connect(CONNECTION);
    //console.log('Database connected');
    app.listen(app.get('port'), () => {
      console.log(`Server is running on port ${app.get('port')}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

connectDB(start);
