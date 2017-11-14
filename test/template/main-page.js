var { tests, logServerPort } = require('./testConfig');
var runner = require('./testRunner.bundle');
externalConfig = require('./config.js');
common = require('./tests/common.js');
Kinvey = require('kinvey-nativescript-sdk').Kinvey;
runner.initialize(tests, { logServerPort });
runner.runAllTests();
