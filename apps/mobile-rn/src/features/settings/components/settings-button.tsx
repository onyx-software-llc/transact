import { TouchableOpacity, Text } from "react-native";

export type SettingsButtonProps = {
  title: string;
  onPress: () => void;
  className?: string;
};

export default function SettingsButton({
  title,
  onPress,
}: SettingsButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
