import { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import MovingAlarmButton from "../components/MovingAlarmButton";

const alarmSound = require("../assets/sounds/alarm.mp3");

export default function AlarmaScreen() {
  const player = useAudioPlayer(alarmSound);

  useEffect(() => {
    startAlarm();
  }, []);

  async function startAlarm() {
    await setAudioModeAsync({
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
    });

    player.loop = true;
    player.volume = 1;
    player.play();
  }

  function stopAlarm() {
    try {
      player.pause();
      player.seekTo(0);
    } catch (error) {
      console.log("Error deteniendo alarma:", error);
    }

    router.replace("/");
  }

  return (
    <View className="flex-1 bg-black">
      <MovingAlarmButton onSuccess={stopAlarm} />
    </View>
  );
}