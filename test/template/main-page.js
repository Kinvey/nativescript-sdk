var { tests, logServerPort } = require('./testConfig');
var runner = require('./testRunner.bundle');

runner.initialize(tests, { logServerPort });
runner.runAllTests();
