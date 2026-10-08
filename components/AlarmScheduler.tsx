import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const ALARMS_KEY = "@alarma_react_native_alarms";

type Alarm = {
  id: string;
  hour: number;
  minute: number;
  days: number[];
  label: string;
  enabled: boolean;
};

export default function AlarmScheduler() {
  const lastTriggered = useRef<string | null>(null);

  useEffect(() => {
    checkAlarms();

    const interval = setInterval(() => {
      checkAlarms();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function checkAlarms() {
    try {
      const data = await AsyncStorage.getItem(ALARMS_KEY);

      if (!data) {
        return;
      }

      const alarms: Alarm[] = JSON.parse(data);

      const now = new Date();

      const hour = now.getHours();
      const minute = now.getMinutes();

      // JS: domingo = 0
      // Nuestra aplicación: lunes = 0
      const today = (now.getDay() + 6) % 7;

      const currentKey =
        `${now.getFullYear()}-` +
        `${now.getMonth()}-` +
        `${now.getDate()}-` +
        `${hour}-` +
        `${minute}`;

      const alarm = alarms.find(
        (item) =>
          item.enabled &&
          item.hour === hour &&
          item.minute === minute &&
          item.days.includes(today)
      );

      if (!alarm) {
        return;
      }

      if (lastTriggered.current === currentKey) {
        return;
      }

      lastTriggered.current = currentKey;

      router.replace("/alarma");
    } catch (error) {
      console.log("Error revisando alarmas:", error);
    }
  }

  return null;
}