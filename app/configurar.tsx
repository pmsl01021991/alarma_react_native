import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View,} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import WakeAlarm from "react-native-wake-alarm";

const DAYS = [
  { short: "L", name: "Lunes" },
  { short: "M", name: "Martes" },
  { short: "X", name: "Miércoles" },
  { short: "J", name: "Jueves" },
  { short: "V", name: "Viernes" },
  { short: "S", name: "Sábado" },
  { short: "D", name: "Domingo" },
];

export default function Configurar() {

  const { alarmId } = useLocalSearchParams<{
        alarmId?: string;
        }>();
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(30);

  const [hourText, setHourText] = useState("07");
  const [minuteText, setMinuteText] = useState("30");
  const [selectedDays, setSelectedDays] = useState<number[]>([
    0,
    1,
    2,
    3,
    4,
  ]);
  const [label, setLabel] = useState("Despertar");

  useEffect(() => {
    if (!alarmId) {
        return;
    }

    loadAlarm();
    }, [alarmId]);

  async function loadAlarm() {
    try {
        const data = await AsyncStorage.getItem(
        "@alarma_react_native_alarms"
        );

        if (!data) {
        return;
        }

        const alarms = JSON.parse(data);

        const alarm = alarms.find(
        (item: any) => item.id === alarmId
        );

        if (!alarm) {
        return;
        }

        setHour(alarm.hour);
        setMinute(alarm.minute);

        setHourText(String(alarm.hour).padStart(2, "0"));
        setMinuteText(String(alarm.minute).padStart(2, "0"));

       setSelectedDays(alarm.days);
       setLabel(alarm.label);
    } catch (error) {
        console.log("Error cargando alarma:", error);
    }
    }

  function toggleDay(index: number) {
    setSelectedDays((current) => {
      if (current.includes(index)) {
        return current.filter((day) => day !== index);
      }

      return [...current, index];
    });
  }

  function increaseHour() {
    setHour((current) => {
        const value = current === 23 ? 0 : current + 1;
        setHourText(String(value).padStart(2, "0"));
        return value;
    });
    }

    function decreaseHour() {
    setHour((current) => {
        const value = current === 0 ? 23 : current - 1;
        setHourText(String(value).padStart(2, "0"));
        return value;
    });
    }

  function increaseMinute() {
    setMinute((current) => {
        const value = current === 59 ? 0 : current + 1;
        setMinuteText(String(value).padStart(2, "0"));
        return value;
    });
    }

    function decreaseMinute() {
    setMinute((current) => {
        const value = current === 0 ? 59 : current - 1;
        setMinuteText(String(value).padStart(2, "0"));
        return value;
    });
    }

  async function saveAlarm() {
    try {
      const data = await AsyncStorage.getItem(
        "@alarma_react_native_alarms"
      );

      const existingAlarms = data
        ? JSON.parse(data)
        : [];

      let savedAlarm;

      if (alarmId) {
        const updatedAlarms = existingAlarms.map(
          (alarm: any) =>
            alarm.id === alarmId
              ? {
                  ...alarm,
                  hour,
                  minute,
                  days: selectedDays,
                  label: label.trim() || "Alarma",
                }
              : alarm
        );

        savedAlarm = updatedAlarms.find(
          (alarm: any) => alarm.id === alarmId
        );

        await AsyncStorage.setItem(
          "@alarma_react_native_alarms",
          JSON.stringify(updatedAlarms)
        );
      } else {
        savedAlarm = {
          id: Date.now().toString(),
          hour,
          minute,
          days: selectedDays,
          label: label.trim() || "Alarma",
          enabled: true,
        };

        existingAlarms.push(savedAlarm);

        await AsyncStorage.setItem(
          "@alarma_react_native_alarms",
          JSON.stringify(existingAlarms)
        );
      }

      await WakeAlarm.cancel(savedAlarm.id);

      if (savedAlarm.enabled) {
        const days = savedAlarm.days.map(
          (day: number) =>
            (day + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7
        );

        const result = await WakeAlarm.schedule({
          id: savedAlarm.id,
          hour: savedAlarm.hour,
          minute: savedAlarm.minute,
          days,
          title: savedAlarm.label,
          body: "¡Es hora de despertar!",
          sound: "alarm",
          vibrate: true,
        });

        if (result.status === "failed") {
          console.log("No se pudo programar la alarma:", result);

          await WakeAlarm.cancel(savedAlarm.id);

          return;
        }

        console.log("Alarma programada correctamente:", result);
      }

      router.back();
    } catch (error) {
      console.log("Error guardando alarma:", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B0F12]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}

        <View className="flex-row items-center px-6 pt-6">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-[#171D21]"
          >
            <Text className="text-2xl text-white">‹</Text>
          </Pressable>

          <Text className="ml-4 text-2xl font-bold text-white">
            Nueva alarma
          </Text>
        </View>

        {/* HORA */}

            <View className="mt-12 flex-row justify-center gap-5">

            {/* HORA */}

            <View className="w-36 items-center rounded-3xl bg-[#151B1F] p-4">

                <Text className="mb-4 text-xs font-bold text-gray-500">
                HORA
                </Text>

                <Pressable
                onPress={increaseHour}
                className="h-11 w-20 items-center justify-center rounded-xl bg-[#252C31]"
                >
                <Text className="text-xl text-white">
                    ▲
                </Text>
                </Pressable>

                <TextInput
                    value={hourText}
                    onChangeText={(text) => {
                        const clean = text.replace(/\D/g, "");

                        if (clean.length <= 2) {
                        setHourText(clean);
                        }

                        if (clean.length === 2) {
                        const value = Number(clean);

                        if (value >= 0 && value <= 23) {
                            setHour(value);
                        }
                        }
                    }}
                    onBlur={() => {
                        const value = Number(hourText);

                        if (value >= 0 && value <= 23) {
                        setHour(value);
                        setHourText(String(value).padStart(2, "0"));
                        } else {
                        setHourText(String(hour).padStart(2, "0"));
                        }
                    }}
                    keyboardType="number-pad"
                    maxLength={2}
                    selectTextOnFocus
                    className="my-5 w-20 text-center text-4xl font-black text-white"
                    />

                <Pressable
                onPress={decreaseHour}
                className="h-11 w-20 items-center justify-center rounded-xl bg-[#252C31]"
                >
                <Text className="text-xl text-white">
                    ▼
                </Text>
                </Pressable>

            </View>


            {/* MINUTOS */}

            <View className="w-36 items-center rounded-3xl bg-[#151B1F] p-4">

                <Text className="mb-4 text-xs font-bold text-gray-500">
                MINUTOS
                </Text>

                <Pressable
                onPress={increaseMinute}
                className="h-11 w-20 items-center justify-center rounded-xl bg-[#252C31]"
                >
                <Text className="text-xl text-white">
                    ▲
                </Text>
                </Pressable>

                <TextInput
                    value={minuteText}
                    onChangeText={(text) => {
                        const clean = text.replace(/\D/g, "");

                        if (clean.length <= 2) {
                        setMinuteText(clean);
                        }

                        if (clean.length === 2) {
                        const value = Number(clean);

                        if (value >= 0 && value <= 59) {
                            setMinute(value);
                        }
                        }
                    }}
                    onBlur={() => {
                        const value = Number(minuteText);

                        if (value >= 0 && value <= 59) {
                        setMinute(value);
                        setMinuteText(String(value).padStart(2, "0"));
                        } else {
                        setMinuteText(String(minute).padStart(2, "0"));
                        }
                    }}
                    keyboardType="number-pad"
                    maxLength={2}
                    selectTextOnFocus
                    className="my-5 w-20 text-center text-4xl font-black text-white"
                    />

                <Pressable
                onPress={decreaseMinute}
                className="h-11 w-20 items-center justify-center rounded-xl bg-[#252C31]"
                >
                <Text className="text-xl text-white">
                    ▼
                </Text>
                </Pressable>

            </View>

            </View>

        {/* REPETIR */}

        <View className="mt-10 px-6">
          <Text className="mb-4 text-lg font-bold text-white">
            Repetir
          </Text>

          <View className="rounded-3xl bg-[#151B1F] p-5">
            <View className="flex-row justify-between">
              {DAYS.map((day, index) => {
                const selected = selectedDays.includes(index);

                return (
                  <Pressable
                    key={day.name}
                    onPress={() => toggleDay(index)}
                    className={`h-10 w-10 items-center justify-center rounded-full ${
                      selected
                        ? "bg-[#B8A7FF]"
                        : "bg-[#252C31]"
                    }`}
                  >
                    <Text
                      className={`font-bold ${
                        selected
                          ? "text-[#171226]"
                          : "text-gray-400"
                      }`}
                    >
                      {day.short}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text className="mt-4 text-sm text-gray-500">
              {selectedDays.length === 7
                ? "Todos los días"
                : selectedDays.length === 0
                ? "No se repetirá"
                : selectedDays.length === 5 &&
                  selectedDays.every((day) => day < 5)
                ? "Lunes a viernes"
                : `${selectedDays.length} días seleccionados`}
            </Text>
          </View>
        </View>

        {/* NOMBRE */}

        <View className="mt-8 px-6">
          <Text className="mb-4 text-lg font-bold text-white">
            Nombre
          </Text>

          <View className="rounded-3xl bg-[#151B1F] px-5">
            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder="Ej. Despertar"
              placeholderTextColor="#666E73"
              className="py-5 text-base text-white"
            />
          </View>
        </View>

        {/* SONIDO */}

        <View className="mt-8 px-6">
          <Text className="mb-4 text-lg font-bold text-white">
            Sonido
          </Text>

          <View className="flex-row items-center justify-between rounded-3xl bg-[#151B1F] p-5">
            <View>
              <Text className="text-base font-semibold text-white">
                Sonido de alarma
              </Text>

              <Text className="mt-1 text-sm text-gray-500">
                Sonido predeterminado
              </Text>
            </View>

            <Text className="text-2xl text-gray-400">
              ›
            </Text>
          </View>
        </View>

        {/* GUARDAR */}

        <View className="mt-10 px-6">
          <Pressable
            onPress={saveAlarm}
            className="rounded-2xl bg-[#B8A7FF] py-5"
          >
            <Text className="text-center text-lg font-black text-[#171226]">
              GUARDAR ALARMA
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
