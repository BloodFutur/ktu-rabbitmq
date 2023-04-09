require('dotenv').config();

// Import modules
const express = require('express')
const swaggerUi = require('swagger-ui-express'); // Swagger UI
const swaggerJsdoc = require('swagger-jsdoc'); // Swagger JSDoc
const bodyParser = require('body-parser');
const reportRoutes = require('./routes/reportController')
const dataCollector = require('./reportDataCollector');

// Init app
const app = express();

// Set port
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json()) // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json
app.use('/api', reportRoutes) // for using routes

// Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:4001/api',
                description: 'Development server'
            }
        ],
    },
    apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(specs, { explorer: true })
);


// Start data collector
dataCollector.init();

// Start server
app.listen(PORT, () => {
    console.log("ProducerAPI listening at port " + PORT);
})