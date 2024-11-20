import { Text, View } from "react-native";
import SettingsButton from "../components/settings-button";
import ThemePicker from "../components/theme-picker";
export default function SettingsScreen() {
  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold dark:text-white">Settings</Text>

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="dark:text-zinc-50">Theme</Text>
          <ThemePicker />
        </View>
        <View className="h-0.5 w-full bg-gray-200 dark:bg-zinc-800" />
        <SettingsButton title="Rate Transact" onPress={() => {}} />
        <SettingsButton title="Send Feedback" onPress={() => {}} />

        <View className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
        <SettingsButton title="Sign Out" onPress={() => {}} />
      </View>
      <View className="items-center justify-center pb-5">
        <Text>Version 1.0.0</Text>
      </View>
    </View>
  );
}
