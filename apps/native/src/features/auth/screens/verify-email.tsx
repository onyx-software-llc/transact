import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { z } from "zod";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const verifyEmailSchema = z.object({
  code: z.string(),
});

type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const { signUp, isLoaded, setActive } = useSignUp();

  const onSubmit = async (data: VerifyEmailSchema) => {
    if (!isLoaded) return;
    if (!signUp) router.replace("/(public)/sign-up");

    const verificationResponse = await signUp.attemptEmailAddressVerification({
      code: data.code,
    });

    console.log("verificationResponse", verificationResponse);

    setActive({ session: verificationResponse.createdSessionId });

    router.replace("/(protected)/(tabs)/");
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text>Verify Email</Text>
      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="Verification Code"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            autoCapitalize="none"
          />
        )}
      />
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text className="text-white text-center font-semibold">
          Submit Verification Code
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Resend Verification Code</Text>
      </TouchableOpacity>
    </View>
  );
}
