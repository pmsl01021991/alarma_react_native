import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 65;

type Position = {
  x: number;
  y: number;
};

export default function MovingAlarmButton({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  const [attempts, setAttempts] = useState(0);

  const positionRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  function moveButton() {
    const maxX = Math.max(
      screenSize.width - BUTTON_WIDTH,
      0
    );

    const maxY = Math.max(
      screenSize.height - BUTTON_HEIGHT,
      0
    );

    const newPosition = {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };

    positionRef.current = newPosition;

    setPosition(newPosition);
  }

  useEffect(() => {
    if (
      screenSize.width === 0 ||
      screenSize.height === 0
    ) {
      return;
    }

    moveButton();

    intervalRef.current = setInterval(() => {
      moveButton();
    }, 700);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [screenSize.width, screenSize.height]);

  function handleTouch(x: number, y: number) {
    const current = positionRef.current;

    const hit =
        x >= current.x &&
        x <= current.x + BUTTON_WIDTH &&
        y >= current.y &&
        y <= current.y + BUTTON_HEIGHT;

    if (hit) {
        const newAttempts = attempts + 1;

        setAttempts(newAttempts);

        if (newAttempts >= 3) {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setTimeout(() => {
            onSuccess();
        }, 0);
        } else {
        moveButton();
        }
    } else {
        moveButton();
    }
    }

  return (
    <View
      className="absolute inset-0"
      onLayout={(event) => {
        const { width, height } =
          event.nativeEvent.layout;

        setScreenSize({
          width,
          height,
        });
      }}
      onStartShouldSetResponder={() => true}
      onResponderRelease={(event) => {
        const { locationX, locationY } =
          event.nativeEvent;

        handleTouch(locationX, locationY);
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: BUTTON_WIDTH,
          height: BUTTON_HEIGHT,
        }}
        className="items-center justify-center rounded-2xl bg-red-600"
      >
        <Text className="text-lg font-black text-white">
            {attempts === 0
                ? "PRIMER INTENTO"
                : attempts === 1
                ? "SEGUNDO INTENTO"
                : attempts === 2
                ? "TERCER INTENTO"
                : "ALARMA DETENIDA"}
            </Text>
      </View>
    </View>
  );
}