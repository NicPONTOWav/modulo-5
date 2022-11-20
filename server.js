const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',(req, res) => {
    res.render('index.html');
});

let messages = [];


io.on('connection', Socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousmessages', messages)    ;
   
    socket.on('sendmassage', data => {
        message.push(data);
        socket.broadcast.emit('receivedmessage', data)
    });
});

server.listen(3000);