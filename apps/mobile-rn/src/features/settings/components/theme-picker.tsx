import React from "react";
import { View } from "react-native";
import { ReactNativePickerMenuView } from "@modules/react-native-picker-menu";
import { Theme, ThemeOptions, useThemeContext } from "@/lib/theme";

export default function PickerComponent() {
  const { themeSelection, setTheme } = useThemeContext();

  return (
    <View>
      <ReactNativePickerMenuView
        style={{ width: 100, height: 25 }}
        selected={themeSelection}
        options={ThemeOptions}
        onValueChange={(v) => {
          console.log("selected theme", v);
          setTheme(v as Theme);
        }}
      />
    </View>
  );
}
