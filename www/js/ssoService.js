/*  SSO Service */
(function(CryptoJS, config) {
  angular.module('sso')
    .factory('ssoService', ssoService);

  ssoService.$inject = ['$http', '$filter'];

  function ssoService($http, $filter) {
    var service = this;
    //exposed api
    service.sso = sso;
    service.getData = getData;
    return service;

    function sso(url, data) {
      console.log(data);
      var payload = JSON.stringify(data);
      var auth = authorize(url, config.privateKey, config.publicKey, config.domain);
      // var auth = 'BACKDOOR';
      console.log(auth);
      $http.defaults.headers.post['Authorization'] = auth;

      return $http.post(url, payload)
        .then(function(response) {
          console.log('response: ');
          console.log(response);
          return response.data;
        });
    }

    function getData(url) {
      return $http.get(url)
        .then(function(response) {
          return response.data;
        });
    }

    function authorize(url, privateKey, publicKey, domain) {
      var timestamp = new Date().toISOString();
      var message = url + '\r\n' + timestamp + '\r\n';
      var hash = CryptoJS.HmacSHA1(message, privateKey);
      var signature = hash.toString(CryptoJS.enc.Base64);
      var authLine = 'TIMESTAMP=' + timestamp + ';SIGNATURE=' + signature + ';PUBLICKEY=' + publicKey;

      if (domain && domain.length > 0 && domain.trim() !== '') {
        authLine = authLine + ';DOMAIN=' + domain;
      }
      return authLine;
    }

  }
}(CryptoJS, Config));
