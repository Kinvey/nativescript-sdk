import { Kinvey } from 'kinvey-js-sdk/dist/kinvey';
import { CacheRack, NetworkRack } from 'kinvey-js-sdk/dist/request';
import { CacheMiddleware, HttpMiddleware } from './src/middleware';

// Setup racks
CacheRack.useCacheMiddleware(new CacheMiddleware());
NetworkRack.useHttpMiddleware(new HttpMiddleware());

// Export
export { Kinvey };
