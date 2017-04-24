/* eslint-disable */
var pkg = require('../package.json');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

// Copy files
mkdir('-p', path.join(rootDir, 's3'));
cp(path.join(rootDir, 'dist', pkg.name + '.js'), path.join(rootDir, 's3', pkg.name + '-' + pkg.version + '.js'));
cp(path.join(rootDir, 'dist', pkg.name + '.min.js'), path.join(rootDir, 's3', pkg.name + '-' + pkg.version + '.min.js'));
