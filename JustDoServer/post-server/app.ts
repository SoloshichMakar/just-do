const express = require('express');
const redis = require('redis');
const nodemailer = require("nodemailer");

const app = express();
const client_redis = redis.createClient(6379,'redis');
let readClient = redis.createClient(6379,'redis');

client_redis.config('set','notify-keyspace-events','KEA');

client_redis.subscribe('__keyevent@0__:set', 'emailJson');

client_redis.on('message', function(channel, key) {
    if( key === 'emailJson') {
        readClient.get(key, async function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            const sendData = JSON.parse(result);
            let transporter = nodemailer.createTransport({
                host: "smtp.yandex.ru",
                port: 465,
                secure: true,
                auth: {
                    user: "justdo.do@yandex.ru",
                    pass: "123456@EE"
                }
            });

            let info = await transporter.sendMail({
                from: "justdo.do@yandex.ru",
                to: sendData.email,
                subject: "Just Do Password Restore",
                text: sendData.message,
            });
        });
    }
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => {
    console.log(`Server is listening to port ${app.get('port')}`);
});