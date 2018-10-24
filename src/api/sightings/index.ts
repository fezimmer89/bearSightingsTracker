import { Router } from 'express';
const controller = require('./sighting.controller');

export default () => {
  let api = new Router();

  api.post('/', controller.create);
  api.get('/find', controller.search);
  api.get('/:id', controller.get);


  return api;
}