import {
	Notifications,
	Permissions,
} from 'expo';
import {AsyncStorage} from 'react-native';

const NOTIFICATION_KEY = 'mobile-flashcards:notification';

export function createNotification() {
	return {
		title: 'Complete a quiz!',
		body: `👋 don't forget to complete a quiz for today!`,
		android: {
			sound: true,
			priority: 'high',
			stick: false,
			vibrate: true,
		}
	}
}

export async function clearLocalNotification() {
	await AsyncStorage.removeItem(NOTIFICATION_KEY);
	return Notifications.cancelAllScheduledNotificationsAsync();
}
export async function getNotifications() {
	const data = await AsyncStorage.getItem(NOTIFICATION_KEY);
  return JSON.parse(data);
}

export async function setLocalNotification() {
	const notifications = await getNotifications();
	if (!notifications) {
		const {status} =
			await Permissions.askAsync(Permissions.NOTIFICATIONS);

		if (status === 'granted') {

			const date = getNotificationDate();

			Notifications.cancelAllScheduledNotificationsAsync();

			Notifications.scheduleLocalNotificationAsync(
				createNotification(),
				{
					time: date,
					repeat: 'day',
				}
			);

			AsyncStorage.setItem(NOTIFICATION_KEY, 'true');
		}
	}
}

function getNotificationDate() {
	const tomorrow =  new Date();

	tomorrow.setDate(tomorrow.getDate() + 1);

	tomorrow.setHours(10);

	tomorrow.setMinutes(0);

	return tomorrow;
}