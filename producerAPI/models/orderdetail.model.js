const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     orderDetail:
 *       type: object
 *       required:
 *         - user
 *         - productName
 *         - quantity
 *       properties:
 *         user:
 *           type: string
 *           description: The user who made the order
 *         productName:
 *           type: string
 *           description: The product name
 *         quantity:
 *           type: number
 *           description: The quantity of the product
 *       example:
 *         user: marco
 *         productName: coffee
 *         quantity: 10
 */
const orderDetailSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('OrderDetail', orderDetailSchema);