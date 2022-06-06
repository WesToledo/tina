import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function schedulePushNotification(
  date,
  title,
  body,
  data,
  callback
) {
  const notification = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: date.valueOf(),
  });
  callback(notification);
}
