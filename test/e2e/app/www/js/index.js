(function(root, Kinvey) {
  var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      // Init Kinvey
      Kinvey.init({
        appKey: 'kid_HkTD2CJc',
        appSecret: 'cd7f658ed0a548dd8dfadf5a1787568b'
      });
    }
  };

  // Initialize
  app.initialize();
})(window, window.Kinvey);
