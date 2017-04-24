import Kinvey from 'src/index.js';
import { randomString } from 'kinvey-js-sdk/dist/utils';
import { NetworkRack, SerializeMiddleware, ParseMiddleware } from 'kinvey-js-sdk/dist/request';
import nock from 'nock';
import { UserMock, HttpMiddlewareMock } from './mocks';

// Setup network rack
NetworkRack.reset();
NetworkRack.use(new SerializeMiddleware());
NetworkRack.use(new HttpMiddlewareMock());
NetworkRack.use(new ParseMiddleware());

// Record for nock
// nock.recorder.rec();

// Init Kinvey
before(function() {
  // return Kinvey.initialize({
  //   appKey: 'kid_HkTD2CJc',
  //   appSecret: 'cd7f658ed0a548dd8dfadf5a1787568b'
  // }).then(() => {
  //   this.client = Kinvey.client;
  // });

  return Kinvey.initialize({
    appKey: randomString(),
    appSecret: randomString()
  }).then(() => {
    this.client = Kinvey.client;
  });
});

// Clean up
after(function() {
  delete this.client;
});

// Login a user
beforeEach(() => UserMock.login('test', 'test'));

// Logout the active user
afterEach(() => UserMock.logout());

// Clean up nock
afterEach(function() {
  nock.cleanAll();
});
