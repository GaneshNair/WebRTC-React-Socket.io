const io = require('socket.io')();

// Emitting
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);
    // Handle initial connect event
    socket.on('offerReady', function(data){
        socket.broadcast.emit('offerReady', data);
    });

    socket.on('answerReady', function(data){
        socket.broadcast.emit('answerReady', data);
        socket.broadcast.emit('waiting', true);
    });

});

const port = 8000;
io.listen(port);
console.log('listening to port ', port);
