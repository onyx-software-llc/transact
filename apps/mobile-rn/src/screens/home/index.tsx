import SignOutButton from "@/features/auth/components/sign-out-button";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl dark:text-white">Home</Text>

      <SignOutButton />
    </View>
  );
}
