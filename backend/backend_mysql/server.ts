// Import the 'express' library for building web applications
import express from 'express';

// Import the 'cors' library for enabling Cross-Origin Resource Sharing (CORS)
import cors from 'cors';

// Import the router from 'stingray.route' for handling API routes
import router from './api/stingray.route';

// Create an instance of the express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON requests and make the parsed data available in req.body
app.use(express.json());

// Use the '/api/v1/stingray' route prefix and delegate route handling to the router
app.use('/api/v1/stingray', router);

// Handle any other routes that are not explicitly defined (404 - Not Found)
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

// Export the configured express application
export default app;
