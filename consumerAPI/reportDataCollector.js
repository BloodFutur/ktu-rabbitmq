/**
 * Report data collector
 */

// Import modules
const MemoryStorage = require('./memoryStorage');
const Order = require('./models/order.model')
const Product = require('./models/product.model')
const Report = require('./models/report.model')
const rabbit = require('./rabbit/index')

/**
 * Data collector
 * @type {Object}
 * @property {Function} init
 */
dataCollector = {
    /**
     * Init data collector
     */
    init: async () => {
        const default_quantity = 100;
        const broker = await rabbit.getInstance();

        // if order is received, update report
        broker.subscribe('report.order', async (msg, ack) => {
            console.log('Message:', msg.content.toString());
            const order = new Order(JSON.parse(msg.content.toString()));
            const storage = await MemoryStorage.getInstance();

            // Check if product exists in storage
            const product = storage.get().find((item) => item.productName === order.productName);
            if (product) {
                // Update product quantity
                product.quantity = product.quantity - order.quantity;
                console.log("Report updated: ", product);
            } else {
                // Create new report in storage
                const report = new Report({
                    productName: order.productName,
                    quantity: default_quantity - order.quantity,
                });
                console.log("Report created: ", report);
                storage.add(report);
            }
            ack();
        });

        // if product is received, update report
        broker.subscribe('report.product', async (msg, ack) => {
            console.log('Message:', msg.content.toString());
            const product = new Product(JSON.parse(msg.content.toString()));
            const storage = await MemoryStorage.getInstance();

            // Check if product exists in storage
            const productInStorage = storage.get().find((item) => item.productName === product.name);
            if (productInStorage) {
                // Set product quantity to default
                productInStorage.quantity = default_quantity;
                console.log("Report updated: ", productInStorage);
            } else {
                // Create new report in storage
                const report = new Report({
                    productName: product.name,
                    quantity: default_quantity,
                });
                console.log("Report created: ", report);
                storage.add(report);
            }
            ack();
        });
    }
}

// Export module
module.exports = dataCollector;

