'use strict';

const Server = require('./src/server.js');

let server;

process.once('SIGTERM', () => {
    if (server) {
        server.exit();
    }
});

server = new Server();

server.start();