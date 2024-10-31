import { Tabs, Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="expenses" options={{ headerShown: false }} />
    </Tabs>
  );
}
