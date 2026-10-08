import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

const THEME_KEY = "@alarma_theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (savedTheme === "light") {
        setIsDark(false);
      }
    } catch (error) {
      console.log("Error cargando tema:", error);
    }
  }

  async function toggleTheme() {
    const newValue = !isDark;

    setIsDark(newValue);

    await AsyncStorage.setItem(
      THEME_KEY,
      newValue ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}