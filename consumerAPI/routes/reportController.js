const express = require('express')
const router = express.Router();

const memoryStorage = require('../memoryStorage');

/**
 * @swagger
 * /reports:
 *   get:
 *     description: Create reports
 *     responses:
 *       200:
 *         description: Get all reports
 *         content:
 *            application/json:
 *              schema:
 *               type: array    
 *               items:
 *                $ref: '#/components/schemas/Report'
 */
router.get('/reports', async (req, res) => {
    console.log("Get all reports");
    const storage = await memoryStorage.getInstance();
    console.log("Reports: ",storage.get());
    res.status(200).json(storage.get());
})

module.exports = router;