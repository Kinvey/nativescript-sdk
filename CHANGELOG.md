# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.8.0](https://github.com/Kinvey/nativescript-sdk/tree/v3.8.0) (2017-08-23)
[Full Changelog](https://github.com/Kinvey/nativescript-sdk/compare/v3.7.2...v3.8.0)<br/>

### Added
_None_

### Removed
_None_

### Changed/Fixed
- Updated [kinvey-js-sdk](https://github.com/Kinvey/js-sdk) dependency to [3.8.0](https://github.com/Kinvey/js-sdk/tree/v3.8.0)

### Merged Pull Requests
- Active User Storage [#1720](https://github.com/Kinvey/nativescript-sdk/pull/17)

### Closed Issues
_None_

## [3.7.2](https://github.com/Kinvey/nativescript-sdk/tree/v3.7.2) (2017-07-28)
[Full Changelog](https://github.com/Kinvey/nativescript-sdk/compare/v3.7.1...v3.7.2)<br/>

### Added
_None_

### Removed
_None_

### Changed/Fixed
- Fixed file uploads.
- Will fallback to use the default storage adapter if the SQLite adapter is unable to be loaded.
- Fix an issue that would throw and error when trying to download a file. The raw data for the file will be returned now either as `NSData` for iOS or `ByteArrayOutputStream` for Android.
- The SDK can now be built on a Windows machine.

### Merged Pull Requests
- Sdk on windows and a fix for a fix [#14](https://github.com/Kinvey/nativescript-sdk/pull/14)
- Fix File Upload [#15](https://github.com/Kinvey/nativescript-sdk/pull/15)

### Closed Issues
- Unable to fetch the entities on the backend [#16](https://github.com/Kinvey/nativescript-sdk/issues/15)

## [3.7.1](https://github.com/Kinvey/html5-sdk/tree/v3.7.1) (2017-07-08)
[Full Changelog](https://github.com/Kinvey/html5-sdk/compare/v3.7.0...v3.7.1)<br/>

### Added
_None_

### Removed
_None_

### Changed/Fixed
_None_

### Merged Pull Requests
- Fix SQLite [#12](https://github.com/Kinvey/nativescript-sdk/pull/12)
- Remove unnecessary "SELECT" operation from removeById [#13](https://github.com/Kinvey/nativescript-sdk/pull/13)

### Closed Issues
_None_