import KinveyStorage from 'kinvey-js-sdk/dist/request/src/middleware/src/storage';
import SQLite from './src/sqlite';

export class Storage extends KinveyStorage {
  name: string;

  constructor(name: string) {
    super(name);
  }

  loadAdapter() {
    return SQLite.load(this.name);
  }
}