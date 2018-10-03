
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    channel = require('cordova/channel');


var Keyboard = function() {
};

Keyboard.hideKeyboardAccessoryBar = function(hide) {
    exec(null, null, "Keyboard", "hideKeyboardAccessoryBar", [hide]);
};

Keyboard.close = function() {
    exec(null, null, "Keyboard", "close", []);
};

Keyboard.show = function() {
    exec(null, null, "Keyboard", "show", []);
};

Keyboard.disableScroll = function(disable) {
    exec(null, null, "Keyboard", "disableScroll", [disable]);
};

/*
Keyboard.styleDark = function(dark) {
 exec(null, null, "Keyboard", "styleDark", [dark]);
};
*/

Keyboard.isVisible = false;

channel.onCordovaReady.subscribe(function() {
    exec(success, null, 'Keyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if ( action === 'S' ) {
            var splitData = msg.split("/");
            var keyboardHeight = parseInt(splitData[1]);
            var hasNavigationBar = splitData[2] == "true" ? true : false;
            var navigationBarHeight = parseInt(splitData[3]);
            
            cordova.plugins.Keyboard.isVisible = true;
            cordova.fireWindowEvent('native.keyboardshow', { 'keyboardHeight': keyboardHeight, 'hasNavigationBar': hasNavigationBar, 'navigationBarHeight': navigationBarHeight});
        } else if ( action === 'H' ) {
            cordova.plugins.Keyboard.isVisible = false;
            cordova.fireWindowEvent('native.keyboardhide');
        }
    }
});

module.exports = Keyboard;
