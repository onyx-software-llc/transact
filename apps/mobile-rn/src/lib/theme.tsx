/**
 * Nativewind can infer the theme from the useColorScheme hook, this package
 * just manages setting the theme and persisting user preference
 */

import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useLayoutEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

export const ThemeOptions: Theme[] = ["dark", "light", "system"];

/**
 * Set the theme to either user preference or system default
 * DO NOT EXPORT THIS DIRECTLY, use useThemeContext instead
 */
function useTheme() {
  const [themeSelection, setThemeSelection] = useState<Theme>("system");
  const { setColorScheme, colorScheme } = useColorScheme();

  const setTheme = (t: Theme): void => {
    setColorScheme(t);
    setThemeSelection(t);
    AsyncStorage.setItem("user_selected_theme", t);
  };

  useLayoutEffect(() => {
    const initTheme = async () => {
      const t = (await AsyncStorage.getItem(
        "user_selected_theme"
      )) as Theme | null;

      if (t) {
        setColorScheme(t);
        setThemeSelection(t);
      } else {
        setColorScheme("system");
      }
    };
    initTheme();
  }, []);

  return { setTheme, themeSelection };
}

/**
 * Even though the value of theme is managed by nativewind, we want to ensure the
 * useTheme hook is only ran once at the root of the app.
 */
export const ThemeContext = createContext<ReturnType<typeof useTheme>>({
  setTheme: () => {},
  themeSelection: "system",
});

/**
 * Wrap the app with this provider to ensure the theme is managed correctly
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={useTheme()}>{children}</ThemeContext.Provider>
  );
}

/**
 * Add this hook to components that need to modify theme state
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
