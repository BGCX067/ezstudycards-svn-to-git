//NotificationBar plugin
var NotificationMessenger = function() {
}

/**
* @param title Title of the notification
* @param body Body of the notification
*/
NotificationMessenger.prototype.notify = function(title, body) {
    return PhoneGap.exec(null, null, 'StatusBarNotification', 'notify', [title, body]);
};

NotificationMessenger.prototype.clear = function() {
    return PhoneGap.exec(null, null, 'StatusBarNotification', 'clear', []);
};


PhoneGap.addConstructor(function() {
		PhoneGap.addPlugin('statusBarNotification', new NotificationMessenger());
		});