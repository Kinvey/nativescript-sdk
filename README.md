# Overview

[Kinvey](http://www.kinvey.com) (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

This SDK makes it easy to connect your [Nativescript](https://www.nativescript.org/) apps with Kinvey.

## How to use

#### Install the NativeScript plugin

```
tns plugin add kinvey-nativescript-sdk
```

#### Install via npm

```javascript
npm install --save kinvey-nativescript-sdk
```

Import the Kinvey NativeScript SDK (ES6/TypeScript):

```javascript
import { Kinvey } from 'kinvey-nativescript-sdk';
```

A [TypeScript](https://www.typescriptlang.org/) type definition file is included in the distribution and will automatically be picked up by the TypeScript compiler.


#### Build from Source

The `master` branch represents the latest stable code in the SDK. To build the SDK, use the following - 

```
npm run build
```

To test - 

```
npm run test
```

_Note: Before running any tests you will need to run `npm install` to install any dependencies required._


All Kinvey JS SDKs are organized as a common core and platform specific shims. To build the entire SDK source - 
- Clone and build the [core js-sdk](https://github.com/Kinvey/js-sdk). The NativeScript shim currently requires that you use the `nativescript` branch of the core.
- Edit the `package.json` of this shim to point to your local copy of the core.
- Build the shim.


## Documentation

For detailed documentation on using the SDK, see http://devcenter.kinvey.com/nativescript


## License
See [LICENSE](LICENSE) for details.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details on reporting bugs and making contributions.
