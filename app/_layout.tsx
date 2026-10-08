import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AlarmScheduler from "../components/AlarmScheduler";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
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