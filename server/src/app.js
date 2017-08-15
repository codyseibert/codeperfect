const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const log4js = require('log4js')

const logger = log4js.getLogger('app')
const app = express()
app.use(log4js.connectLogger(logger, level: log4js.levels.TRACE))
app.use(bodyParser.json())
app.use(cors, {origin: '*'});

module.exports = app;
