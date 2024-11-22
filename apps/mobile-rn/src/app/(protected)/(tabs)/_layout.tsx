import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable } from "react-native";
import React from "react";
import { Ref } from "react";
import { forwardRef } from "react";
import { Settings } from "@/lib/icons/Settings";
import { House } from "@/lib/icons/House";
import { CreditCard } from "@/lib/icons/CreditCard";
import { setupPowerSync } from "@/lib/sync/db";
import { useEffect } from "react";

export type TabButtonProps = TabTriggerSlotProps & {};

export const TabButton = forwardRef(
  ({ children, isFocused, ...props }: TabButtonProps, ref: Ref<View>) => {
    const colorClass = isFocused
      ? "text-red-500 dark:text-red-500"
      : "text-zinc-500";

    return (
      <Pressable ref={ref} {...props}>
        <View>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(
                  child as React.ReactElement<{ className?: string }>,
                  {
                    className: `${
                      (child as React.ReactElement<{ className?: string }>)
                        .props.className || ""
                    } ${colorClass}`,
                  }
                )
              : child
          )}
        </View>
      </Pressable>
    );
  }
);

function SetupPowerSync({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupPowerSync();
  }, []);

  return <>{children}</>;
}

export default function Layout() {
  return (
    <SetupPowerSync>
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <Tabs>
          <TabSlot />
          <TabList className="w-full px-20">
            <TabTrigger asChild name="index" href="/(protected)/(tabs)">
              <TabButton>
                <House size={24} />
              </TabButton>
            </TabTrigger>
            <TabTrigger
              asChild
              name="expenses"
              href="/(protected)/(tabs)/expenses"
            >
              <TabButton>
                <CreditCard size={24} className="text-inherit" />
              </TabButton>
            </TabTrigger>
            <TabTrigger
              asChild
              name="settings"
              href="/(protected)/(tabs)/settings"
            >
              <TabButton>
                <Settings size={24} className="text-inherit" />
              </TabButton>
            </TabTrigger>
          </TabList>
        </Tabs>
      </SafeAreaView>
    </SetupPowerSync>
  );
}
