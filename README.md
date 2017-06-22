# Allied Picture Pay via SSO on Cordova

## Required

- **[NodeJS][node]**
  - `Install NodeJS from the above link`

***After node is installed and on your system's path***

- **[Cordova][cordova]**
  - `npm install -g cordova`
  - `cd path\to\app\root`

#### Restore Platforms and Plugins
`cordova prepare`

#### Build Only
`cordova build`

#### Build & Run On Android
`cordova run android`

***NOTE: This requires the use of an Android device or emulator***

## About

This example uses [AngularJS][angular] to create a simple application which contains an iframe that diplays Allied Payment's Demo Billpay system.
In this situation billpay does not have access to the Cordova APIs to activate the camera plugin.

Therefore a workaround was implemented (wwww/js/messaging.js) which allows the parent application to communicate with the the billpay application through a series of messages.

When the user taps "Pay with Picture" inside billpay a message requesting a picture is sent from billpay to the parent window. The parent cordova application then triggers the camera plugin and returns the image data retrieved from the camera back to billpay in a subsequent message.

## Configuration

`www/js/config.js` contains a configuration object which consists of the following information:

- **privateKey**: Private API key used for authentication
- **publicKey**: Public API key used for authentication
  - *NOTE: Once you have been provided an API key use your key instead of these defaults*
- **domain**: Domain name of the financial institution
- **origin**: Url used to initialize & reset iframe (app.js). Used to verify the origin of the messages (messaging.js)
- **ssoRequest**: JSON object used as the POST body content for the SSO request
  - *NOTE: FinancialInstitutionId must be updated to match the given domain*
- **apiUrl**: Url to Allied's API


[node]: http://nodejs.org/ "NodeJS Documentation"
[cordova]: https://cordova.apache.org/ "Cordova Documentation"
[angular]: https://angularjs.org/ "AngularJS.org"
