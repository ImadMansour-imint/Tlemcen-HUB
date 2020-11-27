#!/usr/bin/env node

/**
 * Module dependencies.
 */
var Chat = require('../models/Chat.js')
var app = require('../app');
var debug = require('debug')('untitled1:server');
var http = require('http');
const { log } = require('console');



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

var names = new Object();
var ids = new Object();
var receivers = new Object();
var io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('name', function(name){
   names[socket.id]= name;
   console.log(name + "name");
   ids[name] = socket.id;
   console.log(socket.id + "id");
   console.log(names[socket.id]);
      socket.broadcast.emit('users',{ liste: ids });
  });
  socket.on ('receiver', function(receiver){
  receivers[socket.id] = receiver;
  });
  socket.on ('getUsers', function(){
    io.to(socket.id).emit('users',{ liste: ids });
  });
  socket.on('disconnect', function(){
      delete ids[names[socket.id]];
      delete names[socket.id];
      socket.broadcast.emit('users',{ liste: ids });
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);


     io.to(ids[receivers[socket.id]]).emit('chat message', names[socket.id] + ':' + msg );
     io.to(socket.id).emit('chat message', 'me: ' + msg );
     console.log(names[socket.id]);
     Chat.create({
      msgFrom:names[socket.id],
       msgTo:receivers[socket.id],
       msg:msg,

  })
      });
});
