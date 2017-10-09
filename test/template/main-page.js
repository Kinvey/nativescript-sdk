var { tests, logServerPort } = require('./testConfig');
var runner = require('./testRunner.bundle');
externalConfig = require('./config.js');

runner.initialize(tests, { logServerPort });
runner.runAllTests();
