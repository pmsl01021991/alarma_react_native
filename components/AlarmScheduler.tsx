import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WakeAlarm from "react-native-wake-alarm";

const ALARMS_KEY = "@alarma_react_native_alarms";

type Alarm = {
  id: string;
  hour: number;
  minute: number;
  days: number[];
  label: string;
  sound?: string;
  enabled: boolean;
};

export default function AlarmScheduler() {
  useEffect(() => {
    syncAlarms();
  }, []);

  async function syncAlarms() {
    try {
      const data = await AsyncStorage.getItem(ALARMS_KEY);

      if (!data) {
        return;
      }

      const alarms: Alarm[] = JSON.parse(data);

      for (const alarm of alarms) {
        if (!alarm.enabled) {
          continue;
        }

        const days = alarm.days.map(
          (day) => (day + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7
        );

        const result = await WakeAlarm.schedule({
          id: alarm.id,
          hour: alarm.hour,
          minute: alarm.minute,
          days,
          title: alarm.label || "Alarma",
          body: "¡Es hora de despertar!",
          sound: alarm.sound || "alarm",
          vibrate: true,
        });

        console.log(
          `Alarma ${alarm.id}:`,
          result
        );
      }
    } catch (error) {
      console.log("Error programando alarmas:", error);
    }
  }

  return null;
}