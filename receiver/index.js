// 1. import express ด้วยการใช้ require
const express = require('express')
var amqp = require('amqplib/callback_api');

const app = express()

app.get('/', function (req, res) {
    res.send('Hello this is receiver server')
})

var port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log("[success] Server is running : listening on http://localhost:" + port);
});

amqp.connect('amqps://alonjbxm:fR8EfzRPvsPiFa8DSj3gGiqmxSbf-tEE@cougar.rmq.cloudamqp.com/alonjbxm', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const exchange = "logs";

        channel.assertExchange(exchange, "fanout", {
            durable: false,
        });
        channel.assertQueue("" ,{ exclusive: true },
            function (error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(
                    " [*] Waiting for messages in %s. To exit press CTRL+C",
                    q.queue
                );
                channel.bindQueue(q.queue, exchange, "");
                channel.consume(
                    q.queue,
                    function (msg) {
                        if (msg.content) {
                            console.log(" [x] %s", msg.content.toString());
                        }
                    },
                    {
                        noAck: true,
                    }
                );
            }
        );
    });
});