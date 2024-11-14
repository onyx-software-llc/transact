import SignOutButton from "@/features/auth/components/sign-out-button";
import { useTheme } from "@/lib/theme";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { toggleTheme } = useTheme();
  return (
    <View className="flex-1 justify-center items-center dark:bg-black">
      <Text className="font-bold text-2xl dark:text-white">Home</Text>
      <SignOutButton />
      <TouchableOpacity onPress={() => toggleTheme()}>
        <Text className="dark:text-white">Set theme</Text>
      </TouchableOpacity>
    </View>
  );
}
