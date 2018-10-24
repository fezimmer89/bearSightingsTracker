import "reflect-metadata";
import express = require('express');
import cors  = require('cors');
import morgan  = require('morgan');
import bodyParser  = require('body-parser');
import api from './api';
const http = require('http');
const config = require('./config.json');

let app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use('/api', api());

app.use(bodyParser.json({
  limit : config.bodyLimit
}));

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

module.exports = app;