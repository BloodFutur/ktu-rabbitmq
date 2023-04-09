require('dotenv').config();
// Import modules
const express = require('express') // Express
const swaggerUi = require('swagger-ui-express'); // Swagger UI
const swaggerJsdoc = require('swagger-jsdoc'); // Swagger JSDoc
const bodyParser = require('body-parser'); // Body parser

// Import routes
const orderRoutes = require('./routes/orderController')
const productRoutes = require('./routes/productController');

// Init app
const app = express();

// Set port
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json())
app.use(bodyParser.json())

// Routes
app.use('/api', orderRoutes)
app.use('/api', productRoutes)

// Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:4000/api',
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

// Start server
app.listen(PORT, () => {
    console.log("ProducerAPI listening at port " + PORT);
})