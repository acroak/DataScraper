"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' library for building web applications
const express_1 = __importDefault(require("express"));
// Import the 'cors' library for enabling Cross-Origin Resource Sharing (CORS)
const cors_1 = __importDefault(require("cors"));
// Import the router from 'stingray.route' for handling API routes
const stingray_route_1 = __importDefault(require("./api/stingray.route"));
// Create an instance of the express application
const app = (0, express_1.default)();
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use((0, cors_1.default)());
// Parse incoming JSON requests and make the parsed data available in req.body
app.use(express_1.default.json());
// Use the '/api/v1/stingray' route prefix and delegate route handling to the router
app.use('/api/v1/stingray', stingray_route_1.default);
// Handle any other routes that are not explicitly defined (404 - Not Found)
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});
// Export the configured express application
exports.default = app;
