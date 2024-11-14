import SignOutButton from "@/features/auth/components/sign-out-button";
import { useThemeContext } from "@/lib/theme";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function Home() {
  const { setTheme, toggleTheme } = useThemeContext();
  const colorScheme = useColorScheme();
  return (
    <View className="justify-center items-center dark:bg-blue-500 w-full h-full">
      <Text className="font-bold text-2xl dark:text-white">Home</Text>

      <SignOutButton />
      <TouchableOpacity onPress={() => toggleTheme()}>
        <Text className="dark:text-white">Set theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTheme("system")}>
        <Text className="dark:text-white">Set theme to system</Text>
      </TouchableOpacity>
      <Text className="font-bold text-2xl dark:text-black">
        Color scheme: {colorScheme}
      </Text>
    </View>
  );
}
