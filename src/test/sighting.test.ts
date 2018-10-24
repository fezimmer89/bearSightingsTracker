process.env.NODE_ENV = 'test';

import { Sighting } from "../api/sightings/sighting.entity";
import { getSightingRepository, saveSighting } from "../api/sightings/sighting.repository";
const server = require('../index');
const faker = require('faker');
const moment = require('moment');
const _ = require('lodash');

const chai = require('chai');
const mocha = require('mocha');

const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;
const should = chai.should();

chai.use(require('chai-http'));
chai.use(require("chai-sorted"));


describe('Sightings', () => {
  beforeEach((done) => { //Before each test we empty the database
    getSightingRepository()
      .then((sightingRepository) => {
        return sightingRepository.find()
          .then((sightings) => {
            return Promise.all(_.map(sightings, (sighting) => {
              return sightingRepository.removeById(sighting);
            }));
          });
        })
        .then(() => {
          done();
        });
  });

  describe('/GET /sighting/:id', () => {
    let sightingMock;
    beforeEach((done) => {
      return generateSighting()
        .then((sighting) => {
          sightingMock = sighting;
          done();
        });
    });

    it('it should GET a sighting by id', (done) => {
      const url = '/sighting/' + sightingMock.id;

      chai.request(server)
        .get(url)
        .end((err, res) => {
          should.exist(res.body);
          res.body.should.be.a('Object');
          res.should.have.status(200);
          done();
        });
      });
  });

  describe('/GET sightings/find', () => {
    const url = '/sighting/search';

    beforeEach((done) => {
      const loop = new Array(10);
      return Promise.all(_.map(loop, () => {
          return generateSighting();
        }))
        .then(() => {
          done();
        });
    });

    describe('checking query params', () => {
      it('it should GET a sightings with defaults', (done) => {
        chai.request(server)
          .get(url)
          .end((err, res) => {
            should.exist(res.body);
            res.body.should.be.a('array');
            res.body.should.have.length(10);
            res.should.have.status(200);
            
            // correctly sorted
            res.body.should.be.sortedBy("created_at", { descending: true });
            done();
          });
      });

      it('it should GET a sightings with sort defaults if using num_bears', (done) => {
        chai.request(server)
          .get(url + '?sort=num_bears')
          .end((err, res) => {
            should.exist(res.body);
            res.body.should.be.a('array');
            res.body.should.have.length(10);
            res.should.have.status(200);

            // correctly sorted
            res.body.should.be.sortedBy("num_bears", { descending: true });
            done();
          });
      });
    });
  });
});


function generateSighting() {
  const sighting = new Sighting();

  const words = faker.random.words();
  sighting.bear_type = faker.name.firstName();
  sighting.notes = words;
  sighting.zip_code = faker.address.zipCode().slice(0, 5);
  sighting.num_bears = words.split(' ').length; // more realistic number for bear sightings :)
  sighting.created_at = moment().toString();

  return saveSighting(sighting)
    .then((sighting) => {
      return sighting;
    });
}