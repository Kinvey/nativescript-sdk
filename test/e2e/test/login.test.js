import expect from 'expect';
import find from 'lodash/find';

describe('User Login', function() {
  before(function() {
    const ctxs = browser.contexts();
    const webviewCtx = find(ctxs.value, ctx => ctx.indexOf('WEBVIEW') === 0);
    browser.context(webviewCtx);
  });

  it('should not login a user when provided an incorrect username', function () {
    const username = 'tester';
    const password = 'test';

    // Input username and password
    const usernameInput = browser.element('#username');
    usernameInput.setValue(username);
    const passwordInput = browser.element('#password');
    passwordInput.setValue(password);

    // Click the login button
    browser.click('#login');

    // Get the active user
    const notification = browser.element('#notify');
    notification.waitForExist(5000);
    const result = browser.execute(function() {
      try {
        return JSON.parse(this.localStorage.getItem('kid_HkTD2CJckinvey_user'));
      } catch (error) {
        return null;
      }
    });
    expect(result.value).toEqual(null);
  });

  it('should not login a user when provided an incorrect password', function() {
    const username = 'test';
    const password = 'tester';

    // Input username and password
    const usernameInput = browser.element('#username');
    usernameInput.setValue(username);
    const passwordInput = browser.element('#password');
    passwordInput.setValue(password);

    // Click the login button
    browser.click('#login');

    // Get the active user
    const notification = browser.element('#notify');
    notification.waitForExist(5000);
    const result = browser.execute(function() {
      try {
        return JSON.parse(this.localStorage.getItem('kid_HkTD2CJckinvey_user'));
      } catch (error) {
        return null;
      }
    });
    expect(result.value).toEqual(null);
  });

  it('should login a user', function() {
    const username = 'test';
    const password = 'test';

    // Input username and password
    const usernameInput = browser.element('#username');
    usernameInput.setValue(username);
    const passwordInput = browser.element('#password');
    passwordInput.setValue(password);

    // Click the login button
    browser.click('#login');

    // Get the active user
    const notification = browser.element('#notify');
    notification.waitForExist(5000);
    const result = browser.execute(function() {
      try {
        return JSON.parse(this.localStorage.getItem('kid_HkTD2CJckinvey_user'));
      } catch (error) {
        return null;
      }
    });
    expect(result.value.username).toEqual(username);
    expect(result.value._kmd).toIncludeKey('authtoken');
  });
});
