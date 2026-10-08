import { useCallback, useState } from "react";
import { Modal, Pressable, ScrollView, Switch, Text, View,} from "react-native";
import { SafeAreaView, useSafeAreaInsets,} from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";

const ALARMS_KEY = "@alarma_react_native_alarms";

type Alarm = {
  id: string;
  hour: number;
  minute: number;
  days: number[];
  label: string;
  enabled: boolean;
};

export default function Index() {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme } = useTheme();

  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadAlarms();
    }, [])
  );

  async function loadAlarms() {
    try {
      const data = await AsyncStorage.getItem(ALARMS_KEY);

      if (data) {
        setAlarms(JSON.parse(data));
      } else {
        setAlarms([]);
      }
    } catch (error) {
      console.log("Error cargando alarmas:", error);
    }
  }

  async function toggleAlarm(id: string, value: boolean) {
    const updated = alarms.map((alarm) =>
      alarm.id === id
        ? {
            ...alarm,
            enabled: value,
          }
        : alarm
    );

    setAlarms(updated);

    await AsyncStorage.setItem(
      ALARMS_KEY,
      JSON.stringify(updated)
    );
  }

  async function deleteAlarm(id: string) {
    const updated = alarms.filter(
      (alarm) => alarm.id !== id
    );

    setAlarms(updated);

    await AsyncStorage.setItem(
      ALARMS_KEY,
      JSON.stringify(updated)
    );
  }

  return (
    <SafeAreaView
        className={`flex-1 ${
            isDark ? "bg-black" : "bg-[#F2F2F7]"
        }`}
        >
        <View
            className={`flex-1 ${
                isDark ? "bg-[#0B0F12]" : "bg-[#F2F2F7]"
            }`}
            >

        {/* HEADER */}

        <View className="flex-row items-center justify-between px-6 pt-12">
          <Text
            className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-[#171717]"
            }`}
            >
            Alarmas
            </Text>

          <Pressable
            onPress={() => setMenuVisible(true)}
            className={`h-11 w-11 items-center justify-center rounded-full ${
                isDark ? "bg-[#171D21]" : "bg-white"
                }`}
            >
            <Text
                className={`text-2xl ${
                    isDark ? "text-white" : "text-[#171717]"
                }`}
                >
                ⋮
            </Text>
            </Pressable>
        </View>

        <Modal
            visible={menuVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
            >
            <Pressable
                className="flex-1"
                onPress={() => setMenuVisible(false)}
            >
                <View
                className={`absolute right-5 top-24 w-64 rounded-3xl p-4 ${
                    isDark ? "bg-[#3A3A3A]" : "bg-white"
                }`}
                >
                <Pressable
                    onPress={() => {
                    toggleTheme();
                    setMenuVisible(false);
                    }}
                    className="rounded-2xl px-4 py-4"
                >
                    <Text
                    className={`text-lg ${
                        isDark ? "text-white" : "text-[#171717]"
                    }`}
                    >
                    {isDark ? "☀️  Modo claro" : "🌙  Modo oscuro"}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                    setMenuVisible(false);
                    }}
                    className="rounded-2xl px-4 py-4"
                >
                    <Text
                    className={`text-lg ${
                        isDark ? "text-white" : "text-[#171717]"
                    }`}
                    >
                    ℹ️  Acerca de la aplicación
                    </Text>
                </Pressable>
                </View>
            </Pressable>
            </Modal>

        {/* LISTA */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingTop: 24,
            paddingBottom: 120,
          }}
        >
          {alarms.map((alarm) => (
            <AlarmCard
                key={alarm.id}
                alarm={alarm}
                onToggle={(value) =>
                    toggleAlarm(alarm.id, value)
                }
                onDelete={() =>
                    deleteAlarm(alarm.id)
                }
                onEdit={() =>
                    router.push({
                    pathname: "/configurar",
                    params: {
                        alarmId: alarm.id,
                    },
                    })
                }
                />
          ))}

          {alarms.length === 0 && (
            <View className="mt-24 items-center px-8">

              <View
                className={`h-24 w-24 items-center justify-center rounded-full ${
                    isDark ? "bg-[#151B1F]" : "bg-white"
                }`}
                >
                <Text className="text-5xl">
                  ⏰
                </Text>
              </View>

              <Text
                className={`mt-7 text-center text-2xl font-bold ${
                    isDark ? "text-white" : "text-[#171717]"
                }`}
                >
                No tienes alarmas
              </Text>

              <Text className="mt-3 text-center text-base leading-6 text-gray-500">
                Pulsa el botón + para crear
                tu primera alarma.
              </Text>

            </View>
          )}
        </ScrollView>

        {/* BOTÓN +  */}

        <Pressable
            onPress={() => router.push("/configurar")}
            style={{
                bottom: insets.bottom + 24,
            }}
            className="absolute right-6 h-16 w-16 items-center justify-center rounded-2xl bg-[#B8A7FF]"
            >
          <Text className="text-4xl font-light text-[#171226]">
            +
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

function AlarmCard({
  alarm,
  onToggle,
  onDelete,
  onEdit,
}: {
  alarm: Alarm;
  onToggle: (value: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
}) {

  const { isDark } = useTheme();
  const daysText = getDaysText(alarm.days);

  return (
    <Pressable
      onPress={onEdit}
      onLongPress={onDelete}
      className={`mb-4 overflow-hidden rounded-[28px] px-6 py-5 ${
        isDark ? "bg-[#151B1F]" : "bg-white"
        }`}
    >

      <View className="flex-row items-center justify-between">

        <View className="flex-1">

          <Text
            className={`text-base font-medium ${
                isDark ? "text-gray-400" : "text-gray-600"
            }`}
            >
            {daysText}
          </Text>

          <View className="mt-3 flex-row items-baseline">

            <Text
              className={`text-[52px] font-light ${
                alarm.enabled
                    ? isDark
                        ? "text-white"
                        : "text-[#171717]"
                    : "text-gray-500"
              }`}
            >
              {String(alarm.hour).padStart(2, "0")}:
              {String(alarm.minute).padStart(2, "0")}
            </Text>

            <Text
              className={`ml-2 text-lg ${
                alarm.enabled
                    ? isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                    : "text-gray-600"
              }`}
            >
              {alarm.hour >= 12
                ? "p. m."
                : "a. m."}
            </Text>

          </View>

        </View>

        <Switch
          value={alarm.enabled}
          onValueChange={onToggle}
          trackColor={{
            false: "#343B40",
            true: "#9B8AFB",
          }}
          thumbColor={
            alarm.enabled
              ? "#FFFFFF"
              : "#858B90"
          }
        />

      </View>

      <View className={`mt-4 border-t pt-4 ${
        isDark ? "border-[#252C31]" : "border-gray-200"
        }`}>

        <Text
            className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
            }`}
            >
            {alarm.label || "Alarma"}
            </Text>

        <Text className="mt-1 text-xs text-gray-600">
          Mantén presionada para eliminar
        </Text>

      </View>

    </Pressable>
  );
}

function getDaysText(days: number[]) {
  if (days.length === 7) {
    return "Todos los días";
  }

  if (
    days.length === 5 &&
    days.every((day) => day < 5)
  ) {
    return "Lun - Vie";
  }

  if (days.length === 0) {
    return "Una vez";
  }

  const names = [
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb",
    "Dom",
  ];

  return days
    .sort((a, b) => a - b)
    .map((day) => names[day])
    .join(" · ");
}