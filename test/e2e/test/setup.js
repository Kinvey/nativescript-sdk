import find from 'lodash/filter';

before(function() {
  const ctxs = browser.contexts();
  const webviewCtx = find(ctxs.value, ctx => ctx.indexOf('WEBVIEW') === 0);
  browser.context(webviewCtx);
});
