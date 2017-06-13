# Overview

[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

This SDK makes it easy to connect your [Nativescript](https://www.nativescript.org/) apps with Kinvey.

## Installation

#### Using npm
Install and save the Kinvey NativeScript SDK:

```javascript
npm install --save kinvey-nativescript-sdk
```

Import the Kinvey NativeScript SDK (ES6/TypeScript):

```javascript
import Kinvey from 'kinvey-nativescript-sdk';
```

A [TypeScript](https://www.typescriptlang.org/) type definition file is included in the distribution and will automatically be picked up by the TypeScript compiler.

#### Using the Kinvey CDN

```html
<script src="https://download.kinvey.com/js/kinvey-nativescript-sdk-3.5.0.min.js"></script>
```

A [TypeScript](https://www.typescriptlang.org/) type definition file is available at

```html
https://download.kinvey.com/js/kinvey-nativescript-sdk-3.5.0.d.ts
```

You will then be able to access Kinvey NativeScript SDK via `window.Kinvey`.

## Documentation

We're working on adding Nativescript docs to our [Devcenter](http://devcenter.kinvey.com)! For documentation on our core Javascript APIs, see http://devcenter.kinvey.com/html5

## Known Limitations

Currently, this SDK supports basic Kinvey auth and data functions, as well as offline behaviors and data synchronization. We're still working on supporting the following features -

* Encryption on the local storage.
* Nativescript docs.

## License
See [LICENSE](LICENSE) for details.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details on reporting bugs and making contributions.
