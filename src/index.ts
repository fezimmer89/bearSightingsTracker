import "reflect-metadata";
import express = require('express');
import cors  = require('cors');
import morgan  = require('morgan');
import bodyParser  = require('body-parser');
import api from './api';
import http = require('http');
const config = require('./config.json');

let app = express();
let server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use('/', api());

app.use(bodyParser.json({
  limit : config.bodyLimit
}));

server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${server.address().port}`);
});

module.exports = app;