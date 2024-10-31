import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpensesScreen() {
  return (
    <SafeAreaView className="flex justify-center items-center w-full h-full">
      <Text>Expenses</Text>
    </SafeAreaView>
  );
}
