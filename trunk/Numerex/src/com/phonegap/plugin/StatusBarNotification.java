/**
 * 
 * Phonegap plugin to Manage status bar notification
 */
package com.phonegap.plugin;

import org.json.JSONArray;
import org.json.JSONException;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.numerex.R;
import com.numerex.NumerexActivity;
import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;
import com.phonegap.api.PluginResult.Status;

public class StatusBarNotification extends Plugin {

	public static final String NOTIFY = "notify";
	public static final String CLEAR = "clear";

	private NotificationManager mNotificationManager;
	private Context context;

	/**
	 * Executes the request and returns PluginResult
	 * 
	 * @param action
	 *            Action to execute
	 * @param data
	 *            JSONArray of arguments to the plugin
	 * @param callbackId
	 *            The callback id used when calling back into JavaScript
	 * 
	 * @return A PluginRequest object with a status
	 * */
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		String ns = android.content.Context.NOTIFICATION_SERVICE;
		mNotificationManager = (NotificationManager) ctx.getSystemService(ns);
		context = ctx.getApplicationContext();

		PluginResult result = null;
		if (NOTIFY.equals(action)) {
			try {

				String title = data.getString(0);
				String body = data.getString(1);
				Log.d("NotificationPlugin", "Notification: " + title + ", "	+ body);
				showNotification(title, body);
				result = new PluginResult(Status.OK);
			} catch (JSONException jsonEx) {
				Log.d("NotificationPlugin","Got JSON Exception " + jsonEx.getMessage());
				result = new PluginResult(Status.JSON_EXCEPTION);
			}
		} else if (CLEAR.equals(action)){
			clearNotification();
		}else {
			result = new PluginResult(Status.INVALID_ACTION);
			Log.d("NotificationPlugin", "Invalid action : " + action+ " passed");
		}
		
		return result;
	}

	/**
	 * Removes the Notification from status bar
	 */
	public void clearNotification() {
		mNotificationManager.cancelAll();
	}

	/**
	 * Displays status bar notification
	 * 
	 * @param contentTitle
	 *            Notification title
	 * @param contentText
	 *            Notification text
	 * */
	public void showNotification(CharSequence contentTitle, CharSequence contentText) {
		int icon = R.drawable.icon;
		long when = System.currentTimeMillis();

		Notification notification = new Notification(icon, contentTitle, when);
		//notification.flags |= Notification.FLAG_NO_CLEAR;

		Intent notificationIntent = new Intent(ctx, NumerexActivity.class);
		notificationIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
		PendingIntent contentIntent = PendingIntent.getActivity(ctx, 0, notificationIntent, 0);
		notification.setLatestEventInfo(context, contentTitle, contentText, contentIntent);

		mNotificationManager.notify(1, notification);
	}
}