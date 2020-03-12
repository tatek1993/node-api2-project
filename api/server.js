const express = require('express');

const port = 5000;


const hubsRouter = require('../hubs/hubs-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    const query = req.query;

    console.log('query', query);

    res.status(200).json(query);
});

server.use('/api/posts', hubsRouter);

module.exports = server;