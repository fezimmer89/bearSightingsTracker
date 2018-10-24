import { Router } from 'express';
const controller = require('./sighting.controller');

export default () => {
  let api = Router();

  api.post('/', controller.create);
  api.get('/search', controller.search);
  api.get('/:id', controller.get);


  return api;
}