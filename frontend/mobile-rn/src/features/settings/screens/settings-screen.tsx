import { Alert, Text, View } from "react-native";
import SettingsButton from "../components/settings-button";
import ThemePicker from "../components/theme-picker";
import { MoveUpRight } from "@/lib/icons/MoveUpRight";
import { LogOut } from "@/lib/icons/LogOut";
import { useClerk } from "@clerk/clerk-expo";

export default function SettingsScreen() {
  const { signOut } = useClerk();

  return (
    <View className="flex-1">
      <View className="mx-3 px-3 pt-4">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 ">
          Settings
        </Text>
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mx-3 px-3 py-4">
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Theme
          </Text>
          <ThemePicker />
        </View>
        <View className="h-0.5 w-full bg-gray-200 dark:bg-zinc-800 my-1" />
        <SettingsButton onPress={() => Alert.alert("Coming Soon")}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Rate Transact
          </Text>
          <MoveUpRight size={16} className="text-zinc-500" />
        </SettingsButton>

        <SettingsButton onPress={() => Alert.alert("Coming Soon")}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Send Feedback
          </Text>
          <MoveUpRight size={16} className="text-zinc-500" />
        </SettingsButton>

        <View className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800 my-1" />
        <SettingsButton onPress={() => signOut()}>
          <Text className="font-medium text-red-500">Sign Out</Text>
          <LogOut size={16} className="text-red-500" />
        </SettingsButton>
      </View>
      <View className="items-center justify-center pb-5">
        <Text className="text-zinc-900 font-light dark:text-zinc-50">
          Version 0.0.1
        </Text>
      </View>
    </View>
  );
}
