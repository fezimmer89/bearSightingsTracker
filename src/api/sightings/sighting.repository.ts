import { createConnection, Repository, Connection } from "typeorm";
import { Sighting } from "./sighting.entity";

let sightingRepository = null;

class SightingRepository extends Repository<Sighting> {
  connection: Connection;

  constructor(connection: Connection) {
    super();
    this.connection = connection;
  }

  findOne(params: any) {
    return this.connection.getRepository(Sighting).findOne(params);
  }
  find(params: any) {
    return this.connection.getRepository(Sighting).find(params);
  }
  save(params: any) {
    return this.connection.getRepository(Sighting).save(params);
  }
  removeById(params: any) {
    return this.connection.getRepository(Sighting).remove(params);
  }
}

export function getSightingRepository() {
  if(sightingRepository && sightingRepository.connection) {
    return new Promise((resolve) => {
      resolve(sightingRepository);
    });
  } else {
    return createConnection()
      .then(connection => {
        sightingRepository = new SightingRepository(connection);
        return sightingRepository;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
    }
}

export function saveSighting(sighting) {
  return getSightingRepository()
    .then((sightingRepository) => {
        return sightingRepository.save(sighting);
    });
}