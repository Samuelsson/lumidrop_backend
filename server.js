import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './app/config';
import routes from './app/routes';

// Initialize our app variable and declaring port nbr
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
mongoose.connect(config.database.url).then(() => {
    console.log(`Successfully Connected to the Mongodb Database at URL: ${config.database.url}`);
}).catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL: ${config.database.url}. Exiting...`);
    process.exit();
});

// Loading the routes
app.use('/', routes);

// Listen to port 3000
app.listen(config.server.port, () => {
    console.log(`Running Express server at port ${config.server.port}`);
});
