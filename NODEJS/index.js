// this is the beginning of the API course
import express from 'express';
import {connectDB} from './lib/connect.js';
import User from './models/user.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// connectDB();

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});