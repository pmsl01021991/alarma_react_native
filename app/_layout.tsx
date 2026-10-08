import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AlarmScheduler from "../components/AlarmScheduler";
import { ThemeProvider } from "../context/ThemeContext";
import WakeAlarm from "react-native-wake-alarm";
import NativeAlarmScreen from "../components/NativeAlarmScreen";

WakeAlarm.registerRingScreen(NativeAlarmScreen);

export default function RootLayout() {
  useEffect(() => {
    async function initializeWakeAlarm() {
      try {
        await WakeAlarm.requestPermissions();
      } catch (error) {
        console.log("Error configurando WakeAlarm:", error);
      }
    }

    initializeWakeAlarm();
  }, []);

  return (
    <ThemeProvider>
      <StatusBar style="light" hidden={false} />

      <AlarmScheduler />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}