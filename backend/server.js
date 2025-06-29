const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/post'); // Importing post routes

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());   
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Blog')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


// Routes
app.use('/api/posts', postRoutes); // Using post routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});