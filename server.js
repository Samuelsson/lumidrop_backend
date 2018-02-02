const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const dbConfig = require('./app/config/database');
const routes = require('./app/routes');

// Initialize our app variable and declaring port nbr
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
    console.log(`Successfully Connected to the Mongodb Database at URL: ${dbConfig.url}`);
}).catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL: ${dbConfig.url}. Exiting...`);
    process.exit();
});

// Loading the routes
app.use('/', routes);

// Listen to port 3000
app.listen(port, () => {
    console.log(`Running Express server at port ${port}`);
});
