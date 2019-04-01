var Messaging = (function(self) {
  var iframe;
  var origin = '*';
  var imageOptions = {
    quality: 100,
    width: 1600,
    height: 1200
  };

  var initialize = function() {
    iframe = document.getElementById('iframe');
    iframe.addEventListener('load', checkCamera, false);
    window.addEventListener('message', onMessage, false);
  };

  var onMessage = function(event) {
    console.log(event);
    if (event.data === 'camera') {
      getPicture();
    }
  };

  var getPicture = function() {
    var options = {
      quality: imageOptions.quality,
      destinationType: navigator.camera.DestinationType.DATA_URL,
      targetWidth: imageOptions.width,
      targetHeight: imageOptions.height
    };
    navigator.camera.getPicture(onPicture, onError, options);
  };

  var onPicture = function(imageData) {
    iframe.contentWindow.postMessage(
      {
        image: imageData
      },
      origin
    );
  };

  var onError = function(message) {
    iframe.contentWindow.postMessage(
      {
        error: message
      },
      origin
    );
  };

  var checkCamera = function(event) {
    var cameraEnabled =
      navigator.camera != null && navigator.camera.getPicture != null;
    console.log(event);
    console.log('Camera enabled: ' + cameraEnabled);
    // inform billpay that cordova camera will be used
    iframe.contentWindow.postMessage(
      {
        cameraEnabled: cameraEnabled
      },
      origin
    );
  };

  self.initialize = initialize;
  return self;
})(Messaging || {});

Messaging.initialize();
