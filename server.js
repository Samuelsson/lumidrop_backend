import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import env from './app/environments';
import routes from './app/routes';

// Initialize our app variable and declaring port nbr
const app = express();

// Connecting to the database
mongoose.connect(env.database.url).then(() => {
    console.log(`Successfully Connected to the Mongodb Database at URL: ${env.database.url}`);
}).catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL: ${env.database.url}. Exiting...`);
    process.exit();
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Loading the routes
app.use('/', routes);

// Listen to port configured port
app.listen(env.server.port, () => {
    console.log(`Running Express server at port ${env.server.port}`);
});
