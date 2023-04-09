const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - productName
 *         - quantity
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product
 *         quantity:
 *           type: number
 *           description: The count of the product
 *       example:
 *         productName: coffee
 *         quantity: 10
 */
const reportSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Report', reportSchema);