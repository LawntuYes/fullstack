// index.js
import express from 'express';
// Assuming connectDB and dotenv setup are correct
import { connectDB } from './lib/connect.js'; 
// Import the aggregated router from your routes/index.js file
import allRoutes from './routes/index.js'; 
// You no longer need to import the User model here

const app = express();
const PORT = process.env.PORT || 3000; 
app.use(express.json());
// Use the aggregated routes under the /api path
app.use('/api', allRoutes); 



// Server Start
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Auth API is ready at /api/auth/`);
});
