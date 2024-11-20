import React from "react";
import { Theme, useThemeContext } from "@/lib/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";

export default function PickerComponent() {
  const { themeSelection, setTheme } = useThemeContext();

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Select
      defaultValue={{
        value: themeSelection,
        label: themeSelection[0].toUpperCase() + themeSelection.slice(1),
      }}
      onValueChange={(option) => setTheme(option!.value as Theme)}
    >
      <SelectTrigger className="w-32">
        <SelectValue
          className="text-foreground dark:text-zinc-50"
          placeholder="Select a fruit"
        />
      </SelectTrigger>
      <SelectContent
        insets={contentInsets}
        className="w-56 bg-zinc-50 dark:bg-zinc-900"
      >
        <SelectItem label="Light" value="light" />
        <SelectSeparator className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        <SelectItem label="Dark" value="dark" />
        <SelectSeparator className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        <SelectItem label="System" value="system" />
      </SelectContent>
    </Select>
  );
}
