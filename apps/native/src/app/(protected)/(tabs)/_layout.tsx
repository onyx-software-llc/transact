import { View } from "react-native";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="expenses" options={{ headerShown: false }} />
    </Tabs>
  );
}
