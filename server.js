const express = require('express');
const server = express();
const cors = require('cors');
// const router = require()
const projectsRouter = require('./routers/projects-router.js');
const actionsRouter = require('./routers/actions-router.js');
const {logger} = require('./middleware')
//middleware
server.use(cors());
server.use(express.json());
server.use(logger);
//projects end points
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);
// endpoints
server.get('/', (req,res) => {
    res.send('<h2>Server</h2>')
})







module.exports = server;