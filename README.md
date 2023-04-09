# Laboratory work 3

This is a laboratory work for the course "Cloud Computing" at Kaunas University of Technology.

## Task

The task is to create two simples APIs communicating with RabbitMQ. The first API is a producer, which sends messages to the queue. The second API is a consumer, which receives messages from the queue.

## Prerequisites

- Docker
- [Node.js](https://nodejs.org/en/) (v12.16.1)
- [Express.js](https://expressjs.com/) (v4.17.1)
  
## Installation

### Manual installation
1. Clone the repository
2. Start the RabbitMQ container: `docker run -it --rm --name mymq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
3. Start the producer: `cd producerAPI && npm install && npm start`
4. Start the consumer: `cd consumerAPI && npm install && npm start`
5. Enjoy!

### Docker installation
1. Clone the repository
2. Start docker-compose: `docker-compose up`
3. Enjoy!