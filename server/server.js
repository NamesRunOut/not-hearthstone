const http = require("http")
const express = require("express");

let gameserver = require('./wzorce/facade');
let socketio = require('socket.io');
let app = express();
let server = http.createServer(app);
const port = process.env.PORT || 4200;
let io = socketio(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
gameserver(io);
let cors = require('cors');
app.use(cors());
server.listen(port, function() {
    console.log('Starting server on port '+port);
});

// npx nodemon server.js

// npx tsc usermodel.ts --target 'es6' --moduleResolution 'node'