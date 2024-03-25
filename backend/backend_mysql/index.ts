// Import the database connection from './db'
import { connection } from './db';

// Import the Express app from './server'
import app from './server';

// Define an asynchronous function named 'main' to start the server
async function main() {
    // Connect to the database
    connection.connect();

    try {
        // Start the Express app and listen on port 8000
        app.listen(8000, () => {
            console.log(`Server is running on port ${8000}`);
        });
    } catch (e) {
        // If an error occurs, log the error and exit the process with an error code
        console.error(e);
        process.exit(1);
    }
}

// Call the 'main' function and handle any errors
main().catch(console.error);
// Alternatively, you can use the following line instead of the previous one if you don't want to handle errors
// main();
