import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpensesScreen() {
  return (
    <SafeAreaView className="flex justify-center items-center w-full h-full">
      <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Expenses
      </Text>
    </SafeAreaView>
  );
}
