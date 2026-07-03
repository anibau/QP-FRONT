import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Setup push notifications for mobile
 * Must be called during app initialization
 */
export async function setupNotifications(): Promise<string | null> {
  if (Platform.OS === 'web') {
    console.warn('Push notifications not available on web');
    return null;
  }

  try {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      console.warn('Notification permissions not granted');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Push token obtained:', token.data);
    return token.data;
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return null;
  }
}

/**
 * Schedule a local notification
 */
export async function sendLocalNotification(title: string, body: string) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1,
      },
    });
  } catch (error) {
    console.error('Error sending local notification:', error);
  }
}

/**
 * Configure notification behavior
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
