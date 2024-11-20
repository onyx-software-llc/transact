import { Pressable } from "react-native";

export type SettingsButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export default function SettingsButton({
  children,
  onPress,
}: SettingsButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between mx-3 px-3 py-4 active:bg-zinc-100 dark:active:bg-zinc-900 rounded-md"
    >
      {children}
    </Pressable>
  );
}
