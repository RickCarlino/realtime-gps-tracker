var io = require('socket.io').listen(8000);

io.sockets.on('connection', function(socket) {
    socket.on('location', function(data) {
      socket.broadcast.emit('location', data);
      console.log(data);
    });
});
