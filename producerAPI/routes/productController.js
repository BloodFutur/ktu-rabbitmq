/**
 * This file contains the routes for the product
 */

// Import modules
const express = require('express')
const router = express.Router();
const rabbit = require('../rabbit/index');

// Import model
const Product = require('../models/product.model');

/**
 * @swagger
 * /product:
 *   post:
 *     description: Create one order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                description: Name of the product
 *                type: string
 *               description:
 *                description: Description of the product
 *                type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */
router.post('/product', async (req, res) => {

    // Create product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
    });

    // Send product to broker
    const broker = await rabbit.getInstance();
    console.log("Sending message to broker");
    await broker.send("report.product", Buffer.from(JSON.stringify(product)));
    console.log("Message sent to broker");
    console.log("Product created: ",product);

    // Return product
    res.status(201).json(product);
})

module.exports = router;