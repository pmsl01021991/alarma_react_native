import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AlarmScheduler from "../components/AlarmScheduler";
import { ThemeProvider } from "../context/ThemeContext";
import WakeAlarm from "react-native-wake-alarm";
import NativeAlarmScreen from "../components/NativeAlarmScreen";

export default function RootLayout() {
  useEffect(() => {
  WakeAlarm.requestPermissions().then((result) => {
    console.log("Permisos WakeAlarm:", result);
  });
}, []);
  WakeAlarm.registerRingScreen(NativeAlarmScreen);
  
  return (
    <ThemeProvider>
      <StatusBar
        style="light"
        hidden={false}
      />

      <AlarmScheduler />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}