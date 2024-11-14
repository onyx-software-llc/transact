import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLayoutEffect } from "react";

export type Theme = "dark" | "light" | "system";

/**
 * Set the theme to either user preference or system default
 */
export function useTheme() {
  const { setColorScheme, colorScheme } = useColorScheme();

  const setTheme = (t: Theme): void => {
    setColorScheme(t);
    AsyncStorage.setItem("user_selected_theme", t);
  };

  const toggleTheme = (): void => {
    const t = colorScheme === "dark" ? "light" : "dark";
    setTheme(t);
    AsyncStorage.setItem("user_selected_theme", t);
  };

  useLayoutEffect(() => {
    console.log("Setting theme");
    const initTheme = async () => {
      const t = (await AsyncStorage.getItem(
        "user_selected_theme"
      )) as Theme | null;

      setColorScheme(t || "system");
    };
    initTheme();
  }, []);

  return { setTheme, toggleTheme };
}
