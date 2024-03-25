"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the database connection from './db'
const db_1 = require("./db");
// Import the Express app from './server'
const server_1 = __importDefault(require("./server"));
// Define an asynchronous function named 'main' to start the server
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to the database
        db_1.connection.connect();
        try {
            // Start the Express app and listen on port 8000
            server_1.default.listen(8000, () => {
                console.log(`Server is running on port ${8000}`);
            });
        }
        catch (e) {
            // If an error occurs, log the error and exit the process with an error code
            console.error(e);
            process.exit(1);
        }
    });
}
// Call the 'main' function and handle any errors
main().catch(console.error);
// Alternatively, you can use the following line instead of the previous one if you don't want to handle errors
// main();
