import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerComponent() {
  const [selectedValue, setSelectedValue] = useState("One");
  const counts = ["One", "Two", "Three"];

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Selection</Text>
      <View style={{ borderWidth: 1, borderRadius: 8, overflow: "hidden" }}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {counts.map((count) => (
            <Picker.Item key={count} label={count} value={count} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
