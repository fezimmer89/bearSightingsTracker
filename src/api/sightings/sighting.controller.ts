'use strict';
import { Sighting } from "./sighting.entity";
import { getSightingRepository, saveSighting } from "./sighting.repository";
const _ = require('lodash');
const moment = require('moment');

interface searchQuery {
  start_date?: string;
  end_date?: string;
  bear_type?: string;
  zip_code?: string;
  sort?: string;
}


export function get(req, res) {
  return getSightingRepository()
    .then((sightingRepository) => {
      return sightingRepository.findOne({ id: req.params.id });
    })
    .then((sighting) => {
      if(!sighting) {
        return res.status(404).end();
      }
      return res.json(sighting);
  })
  .catch(error => {
    console.log(error);
    return res.status(500).json({ error: error });
  });
}

export function create(req, res) {
  const sighting = new Sighting();

  sighting.bear_type = req.params.bear_type;
  sighting.notes = req.params.notes;
  sighting.zip_code = req.params.zip_code;
  sighting.num_bears = req.params.num_bears;
  sighting.created_at = moment().toString();

  return saveSighting(sighting)
    .then(() => {
      return res.json(sighting);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ error: error });
    });
}

export function search(req, res) {
  const queryParams = req.query as searchQuery;

  return getSightingRepository()
    .then((sightingRepository) => {
      return sightingRepository.find();
    })
    .then((sightings) => {
        return _.filter(sightings, (sighting) => {
          return filterSighting(queryParams, sighting);
        });
    })
    .then((filteredSightings) => {
      if(queryParams.sort && queryParams.sort == 'num_bears') {
        return _.orderBy(filteredSightings, ['num_bears'], ['desc']);
      } else {
        return _.orderBy(filteredSightings, (sighting) => {
            return moment(sighting.created_at);
          }, ['desc']);
      }
    })
    .then((orderedSightings) => {
      return res.json(orderedSightings);
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ error: error });
    });
}

// -- private -- 

function filterSighting(queryParams: searchQuery, sighting: Sighting) {
  let valid = true;

  if(queryParams.start_date) {
    let startDate = moment(new Date(queryParams.start_date));
    valid = (!startDate.isValid() || startDate.isBefore(sighting.created_at));
  }
  if(valid && queryParams.end_date) {
    let endDate = moment(new Date(queryParams.end_date));
    valid = (!endDate.isValid() || endDate.isAfter(sighting.created_at));
  }
  if(valid && queryParams.bear_type) {
    valid = sighting.bear_type == queryParams.bear_type;
  }
  if(valid && queryParams.zip_code) {
    valid = sighting.zip_code == queryParams.zip_code;
  }

  return valid;
}