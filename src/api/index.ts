const packageObj = require('../../package.json');
import { Router } from 'express';
import sightings from './sightings';

export default () => {
	let api = Router();

	api.use('/sighting', sightings());

	// expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json(packageObj["version"]);
	});

	return api;
}