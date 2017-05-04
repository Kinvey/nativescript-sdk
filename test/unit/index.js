import { Kinvey } from 'kinvey-js-sdk';
import nock from 'nock';

// Record for nock
// nock.recorder.rec();

// Init Kinvey
before(function() {
  Kinvey.init({
    appKey: 'kid_HkTD2CJc',
    appSecret: 'cd7f658ed0a548dd8dfadf5a1787568b'
  });
});

// Clear nock
afterEach(function() {
  nock.cleanAll();
});
