import express from 'express';
import morgan from 'morgan';
import moleculeRouter from './molecules/molecule.route';
import viewerRouter from './public/viewer.route';
import path from "node:path";
import dotenv from 'dotenv';
import Logger from "./core/logger";



const app = express();

/**
 * Load environment variables from the appropriate file
 */
function loadEnv() {
    const ENV = process.env.NODE_ENV || 'dev';
    dotenv.config({path: path.resolve(__dirname, `.env.${ENV}`)});
}

/**
 * Registers all middleware used before routing.
 */
function registerMiddleware() {
    // Logs HTTP requests to the console (dev format)
    app.use(morgan('dev'));

    // Serves static files from the "public" directory
    app.use(express.static('public'));

    // Parses incoming JSON requests
    app.use(express.json());
}

/**
 * Registers all application routes.
 */
function registerRoutes() {
    // Root route to serve the 3D viewer page
    app.use('/', viewerRouter);


    // API routes for molecule resources
    app.use('/api/molecules', moleculeRouter);
}

/**
 * Registers global error-handling middleware.
 */
function registerErrorHandling() {
    // Catches unhandled errors and returns a 500 response
    app.use((
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        Logger.error('Unexpected error:', err);
        res.status(500).json({message: 'Internal server error'});
    });
}

// Initialize server setup
loadEnv();
registerMiddleware();
registerRoutes();
registerErrorHandling();


export default app;
