import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, Text } from "react-native";
import { Ref } from "react";
import { forwardRef } from "react";

export type TabButtonProps = TabTriggerSlotProps & {};

export const TabButton = forwardRef(
  ({ children, isFocused, ...props }: TabButtonProps, ref: Ref<View>) => {
    return (
      <Pressable ref={ref} {...props}>
        <Text
          className={` ${
            isFocused
              ? "text-red-500 dark:text-red-500" //focused
              : "text-black dark:text-white" //unfocused
          }`}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

export default function Layout() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <Tabs>
        <TabSlot />
        <TabList className="w-full px-20">
          <TabTrigger asChild name="index" href="/(protected)/(tabs)">
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger
            asChild
            name="expenses"
            href="/(protected)/(tabs)/expenses"
          >
            <TabButton>Expenses</TabButton>
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}
