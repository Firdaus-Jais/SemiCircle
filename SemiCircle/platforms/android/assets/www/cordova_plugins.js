cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.4",
  "cordova-plugin-device": "2.0.3",
  "cordova-plugin-crosswalk-webview": "2.4.0",
  "cordova-android-support-gradle-release": "3.0.1"
};
// BOTTOM OF METADATA
});