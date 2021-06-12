var amqp = require('amqplib/callback_api');

//connect to RabbitMQ server
function send(obj) {
    amqp.connect('amqps://alonjbxm:fR8EfzRPvsPiFa8DSj3gGiqmxSbf-tEE@cougar.rmq.cloudamqp.com/alonjbxm', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            //exchange path
            const exchange = "logs";
            const msg = JSON.stringify(obj)

            channel.assertExchange(exchange, "fanout", {
                durable: false,
            });
            channel.publish(exchange, "", Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });
}

module.exports.send = send;