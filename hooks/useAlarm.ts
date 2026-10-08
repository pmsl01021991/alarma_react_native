import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const ALARM_KEY = "@alarm_data";

export type AlarmData = {
  hour: number;
  minute: number;
  enabled: boolean;
  notificationId?: string;
};

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permiso de notificaciones no concedido");
  }
}

export async function createAlarm(hour: number, minute: number) {
  await requestNotificationPermission();

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("alarm", {
      name: "Alarmas",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 1000, 500, 1000],
      sound: "alarm.mp3",
      lockscreenVisibility:
        Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  const oldAlarm = await AsyncStorage.getItem(ALARM_KEY);

  if (oldAlarm) {
    const parsed: AlarmData = JSON.parse(oldAlarm);

    if (parsed.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        parsed.notificationId
      );
    }
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "🚨 DESPIERTA",
      body: "La alarma está sonando",
      sound: "alarm.mp3",
      data: {
        type: "alarm",
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: "alarm",
    },
  });

  const alarm: AlarmData = {
    hour,
    minute,
    enabled: true,
    notificationId,
  };

  await AsyncStorage.setItem(ALARM_KEY, JSON.stringify(alarm));

  return alarm;
}

export async function getAlarm(): Promise<AlarmData | null> {
  const data = await AsyncStorage.getItem(ALARM_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export async function deleteAlarm() {
  const data = await AsyncStorage.getItem(ALARM_KEY);

  if (data) {
    const alarm: AlarmData = JSON.parse(data);

    if (alarm.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        alarm.notificationId
      );
    }
  }

  await AsyncStorage.removeItem(ALARM_KEY);
}