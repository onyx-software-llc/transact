import { requireNativeView } from "expo";
import { ViewProps } from "react-native";
import * as React from "react";

export type Props = {
  selected: string;
  options: string[];
  onValueChange: (value: string) => void;
} & ViewProps;

const NativeView: React.ComponentType<Props> = requireNativeView(
  "ReactNativePickerMenu"
);

export default function ReactNativePickerMenuView(props: Props) {
  return <NativeView {...props} />;
}
