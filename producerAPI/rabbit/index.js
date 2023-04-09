const amqp = require('amqplib')
const _ = require('lodash');

/**
 * @var {Promise<MessageBroker}
 */
let instance;

/**
 * Broker for  async messaging
 */
class MessageBroker {

    /**
     * Trigger init connect method
     */
    constructor() {
        this.queues = []
    }

    /**
     * Initialize connection to RabbitMQ
     */
    async init() {
        this.connection = await amqp.connect(process.env.AMPQ_URL || 'amqp://guest:guest@localhost:5672');
        console.log("Connected to RabbitMQ");

        console.log("Creating channel...");
        this.channel = await this.connection.createChannel();
        console.log("Channel created");

        return this;
    }

    /**
     * Send message to queue
     * @param {String} queue Queue name
     * @param {Object} message Message as Buffer
     */
    async send(queue, message) {
        if (!this.connection) {
            await this.init();
        }

        // Check if queue already exists
        await this.channel.assertQueue(queue, {
            durable: true
        });
        this.channel.sendToQueue(queue, message);
    }

    /**
     * Subscribe
     * @param {String} queue Queue name
     * @param {Function} handler Handler that will be invoked with given message and acknowledge function
     * @returns 
     */
    async subscribe(queue, handler) {
        if (!this.connection) {
            await this.init();
        }
        
        // Check if queue already exists
        if (this.queues[queue]) {
            // Check if handler already exists
            const existingHandler = _.find(this.queues[queue], h => h === handler)
            if (existingHandler) {
                return () => this.unsubscribe(queue, existingHandler)
            }

            // Add handler to queue
            this.queues[queue].push(handler)
            return () => this.unsubscribe(queue, handler)
        }

        // Create new queue
        await this.channel.assertQueue(queue, { durable: true });
        this.queues[queue] = [handler]

        // Start consuming
        this.channel.consume(
            queue,
            async (msg) => {
                const ack = _.once(() => this.channel.ack(msg))
                this.queues[queue].forEach(h => h(msg, ack))
            }
        );
        return () => this.unsubscribe(queue, handler)
    }

    /**
     * Unsuscribe
     * @param {String} queue Queue name
     * @param {Function} handler Function
     */
    async unsubscribe(queue, handler) {
        _.pull(this.queues[queue], handler)
    }


}

/**
 * Function to get instance of MessageBroker
 * 
 * @return {Promise<MessageBroker>}
 */
MessageBroker.getInstance = async function () {
    if (!instance) {
        const broker = new MessageBroker();
        instance = broker.init()
    }
    return instance;
}

module.exports = MessageBroker;
