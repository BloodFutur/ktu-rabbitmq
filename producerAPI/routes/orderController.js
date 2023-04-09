/**
 * This file contains the routes for the order
 */

// Import modules
const express = require('express')
const router = express.Router();
const rabbit = require('../rabbit/index');

// Import model
const Order = require('../models/orderdetail.model');

/**
 * @swagger
 * /order:
 *   post:
 *     description: Create one order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                type: string
 *               productName:
 *                type: string
 *               quantity:
 *                type: number
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/orderDetail'
 *       400:
 *         description: Bad request
 */
router.post('/order', async (req, res) => {
    // Create order
    const order = new Order({
        user: req.body.user,
        productName: req.body.productName,
        quantity: req.body.quantity,
    });

    // Send order to broker
    const broker = await rabbit.getInstance();
    console.log("Sending message to broker");
    await broker.send("report.order", Buffer.from(JSON.stringify(order)));
    console.log("Message sent to broker");
    console.log("Order created: ",order);
    
    // Return order
    res.status(201).json(order);
})

module.exports = router;