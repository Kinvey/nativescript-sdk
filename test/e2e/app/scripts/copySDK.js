var fs = require('fs-extra');
var path = require('path');
var distSDKFile = path.resolve(__dirname, '../../../../dist/kinvey-phonegap-sdk.js');
var testAppSDKFile = path.resolve(__dirname, '../www/js/vendor/kinvey-phonegap-sdk.js');

module.exports = function() {
  try {
    fs.removeSync(testAppSDKFile);
  } catch (error) {
    // The file did not exist
  }

  try {
    fs.copySync(distSDKFile, testAppSDKFile);
  } catch (error) {
    console.log('Failed to copy SDK file.', error);
  }
};
