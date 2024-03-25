// Import necessary modules
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a MySQL database connection using the 'mysql2' module
// The connection details are retrieved from environment variables
export const connection: any = mysql.createConnection({
    host: process.env.DB_HOST,      // Database host
    user: process.env.DB_USER,      // Database user
    password: process.env.DB_PASS,  // Database password
    database: process.env.DB_NAME,  // Database name
});
