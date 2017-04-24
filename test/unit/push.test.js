import { EventEmitter } from 'events';
import { CacheRequest, RequestMethod, NotFoundError, randomString } from 'kinvey-js-sdk/dist/export';
import isFunction from 'lodash/isFunction';
import os from 'os';
import url from 'url';
import nock from 'nock';
import expect from 'expect';
import { PushMock, PushMockClass, UserMock } from './mocks';
const APP_DATA_NAMESPACE = process.env.KINVEY_DATASTORE_NAMESPACE || 'appdata';
const PUSH_NAMESPACE = process.env.KINVEY_PUSH_NAMESPACE || 'push';

class DevicePlugin {
  get platform() {
    return os.type();
  }
}

class PushNotificationPlugin extends EventEmitter {
  unregister(done) {
    if (isFunction(done)) {
      done();
    }
  }

  static init() {
    return new PushNotificationPlugin();
  }
}

describe('Push', function() {
  beforeEach(function() {
    global.device = new DevicePlugin();
    global.PushNotification = PushNotificationPlugin;
  });

  describe('register()', function() {
    it('should fail if the platform does not support push notifications', function() {
      class CustomPush extends PushMockClass {
        isSupported() {
          return false;
        }
      }

      return new CustomPush()
        .register()
        .catch((error) => {
          expect(error.message).toEqual('Kinvey currently only supports push notifications on iOS and Android platforms.');
        });
    });

    it('should fail if the Cordova Device plugin is not installed', function() {
      delete global.device;

      return PushMock
        .register()
        .catch((error) => {
          expect(error.message).toEqual('Cordova Device Plugin is not installed.');
          expect(error.debug).toEqual('Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp'
            + ' for help with setting up your project.');
        });
    });

    it('should fail if the PhoneGap Push Notification Plugin is not installed', function() {
      delete global.PushNotification;

      return PushMock
        .register()
        .catch((error) => {
          expect(error.message).toEqual('PhoneGap Push Notification Plugin is not installed.');
          expect(error.debug).toEqual('Please refer to http://devcenter.kinvey.com/phonegap/guides/push#ProjectSetUp'
            + ' for help with setting up your project.');
        });
    });

    it('should fail if an error event is received while retrieving the device id', function() {
      const deviceIdError = new Error('Unable to retrieve device id.');
      class CustomPushNotificationPlugin extends PushNotificationPlugin {
        static init() {
          const plugin = super.init();

          // Emit registration error
          setTimeout(() => {
            plugin.emit('error', deviceIdError);
          }, 250);

          return plugin;
        }
      }
      global.PushNotification = CustomPushNotificationPlugin;

      return PushMock
        .register()
        .catch((error) => {
          expect(error.message).toEqual('An error occurred registering this device for push notifications.');
          expect(error.debug).toEqual(deviceIdError);
        });
    });

    it('should register the device', function() {
      const deviceId = randomString();
      class CustomPushNotificationPlugin extends PushNotificationPlugin {
        static init() {
          const plugin = super.init();

          // Emit the registration id
          setTimeout(() => {
            plugin.emit('registration', {
              registrationId: deviceId
            });
          }, 250);

          return plugin;
        }
      }
      global.PushNotification = CustomPushNotificationPlugin;

      // Setup API response for registering a device
      nock(this.client.apiHostname, { encodedQueryParams: true })
        .post(`/${PUSH_NAMESPACE}/${this.client.appKey}/register-device`, {
          platform: global.device.platform.toLowerCase(),
          framework: 'phonegap',
          deviceId: deviceId,
          userId: undefined
        })
        .reply(204);

      return PushMock
        .register()
        .then((response) => {
          expect(response).toEqual(deviceId);

          // const user = TestUser.getActiveUser(Push.client);
          // const key = `/${PUSH_NAMESPACE}/${Push.client.appKey}_${user._id}`;
          // expect(localStorage.get(key)).toEqual({ deviceId: deviceId });
        });
    });

    describe('notification', function() {
      it('should emit notification to listeners', function() {
        const deviceId = randomString();
        const notification = {
          title: randomString(),
          message: randomString()
        };

        // Create onNotification spy function
        const onNotificationSpy = expect.createSpy();
        PushMock.onNotification(onNotificationSpy);

        // Custom Push Notification Plugin
        class CustomPushNotificationPlugin extends PushNotificationPlugin {
          static init() {
            const plugin = super.init();

            // Emit the registration id
            setTimeout(() => {
              plugin.emit('registration', {
                registrationId: deviceId
              });

              // Emmit a notification
              setTimeout(() => {
                plugin.emit('notification', notification);
              }, 250);
            }, 250);

            return plugin;
          }
        }
        global.PushNotification = CustomPushNotificationPlugin;

        // Setup API response for registering a device
        nock(this.client.apiHostname, { encodedQueryParams: true })
          .post(`/${PUSH_NAMESPACE}/${this.client.appKey}/register-device`, {
            platform: global.device.platform.toLowerCase(),
            framework: 'phonegap',
            deviceId: deviceId,
            userId: undefined
          })
          .reply(204);

        return PushMock
          .register()
          .then(() => {
            return new Promise((resolve) => {
              setTimeout(function() {
                resolve(expect(onNotificationSpy).toHaveBeenCalledWith(notification));
              }, 1000);
            });
          });
      });
    });
  });

  describe('unregister()', function() {
    it('should not fail if the device has not been registered', function() {
      return PushMock
        .unregister()
        .then((response) => {
          expect(response).toEqual(null);

          // const user = TestUser.getActiveUser(this.client);
          // const key = `/${PUSH_NAMESPACE}/${this.client.appKey}_${user._id}`;
          // expect(localStorage.get(key)).toEqual(null);
        });
    });

    it('should unregister the device that has been registered', function() {
      const deviceId = randomString();
      class CustomPushNotificationPlugin extends PushNotificationPlugin {
        static init() {
          const plugin = super.init();

          // Emit the registration id
          setTimeout(() => {
            plugin.emit('registration', {
              registrationId: deviceId
            });
          }, 250);

          return plugin;
        }
      }
      global.PushNotification = CustomPushNotificationPlugin;

      // Setup API response for registering a device
      nock(this.client.apiHostname, { encodedQueryParams: true })
        .post(`/${PUSH_NAMESPACE}/${this.client.appKey}/register-device`, {
          platform: global.device.platform.toLowerCase(),
          framework: 'phonegap',
          deviceId: deviceId,
          userId: undefined
        })
        .reply(204);

      // Setup API response for unregistering a device
      nock(this.client.apiHostname, { encodedQueryParams: true })
        .post(`/${PUSH_NAMESPACE}/${this.client.appKey}/unregister-device`, {
          platform: global.device.platform.toLowerCase(),
          framework: 'phonegap',
          deviceId: deviceId,
          userId: undefined
        })
        .reply(204);

      return PushMock
        .register()
        .then(() => PushMock.unregister())
        .then((response) => {
          expect(response).toEqual(null);

          const user = UserMock.getActiveUser(this.client);
          const request = new CacheRequest({
            method: RequestMethod.GET,
            url: url.format({
              protocol: this.client.protocol,
              host: this.client.host,
              pathname: `/${APP_DATA_NAMESPACE}/${this.client.appKey}/__device/${user._id}`
            }),
            client: this.client
          });
          return request.execute()
            .catch((error) => {
              expect(error).toBeA(NotFoundError);
              return {};
            })
            .then(response => response.data)
            .then((device) => {
              expect(device).toEqual(null);
            });
        });
    });
  });
});
