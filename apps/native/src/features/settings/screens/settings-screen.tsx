import { Text, View } from "react-native";
import SettingsButton from "../components/settings-button";
import { ReactNativePickerMenuView } from "@modules/react-native-picker-menu";
import { Theme, ThemeOptions, useThemeContext } from "@/lib/theme";

export default function SettingsScreen() {
  const { themeSelection, setTheme } = useThemeContext();
  console.log("themeSelection", themeSelection);

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold dark:text-white">Settings</Text>

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text>Theme</Text>
          <View>
            <ReactNativePickerMenuView
              style={{ width: 100, height: 25 }}
              selected={themeSelection}
              options={ThemeOptions}
              onValueChange={(v) => setTheme(v as Theme)}
            />
          </View>
        </View>
        <View className="h-0.5 w-full bg-gray-200" />
        <SettingsButton title="Rate Transact" onPress={() => {}} />
        <SettingsButton title="Send Feedback" onPress={() => {}} />

        <View className="h-0.5 w-full bg-gray-200" />
        <SettingsButton title="Sign Out" onPress={() => {}} />
      </View>
      <View className="items-center justify-center pb-5">
        <Text>Version 1.0.0</Text>
      </View>
    </View>
  );
}
