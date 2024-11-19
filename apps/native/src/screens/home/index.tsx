import SignOutButton from "@/features/auth/components/sign-out-button";
import { useThemeContext } from "@/lib/theme";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function Home() {
  const { setTheme, toggleTheme, themeSelection } = useThemeContext();
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl dark:text-white">Home</Text>

      <SignOutButton />
      <TouchableOpacity onPress={() => toggleTheme()}>
        <Text className="dark:text-white">Set theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme("system")}>
        <Text className="dark:text-white">Set theme to system</Text>
      </TouchableOpacity>
      <Text className="font-bold text-2xl dark:text-white">
        Color scheme:{" "}
        <Text className="text-red-500 dark:text-white">{colorScheme}</Text>
      </Text>
      <Text className="font-bold text-2xl dark:text-white">
        Theme Selection:{" "}
        <Text className="text-red-500 dark:text-white">{themeSelection}</Text>
      </Text>
    </View>
  );
}
