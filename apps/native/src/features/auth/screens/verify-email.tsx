import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { z } from "zod";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { getClerkErrorMessage } from "../lib/clerk";
import { isClerkError } from "../lib/clerk";
import { DEFAULT_ERROR_MESSAGE } from "../constants/ERROR_MESSAGE";

const verifyEmailSchema = z.object({
  code: z.string(),
});

type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { signUp, isLoaded, setActive } = useSignUp();

  const onSubmit = async (data: VerifyEmailSchema) => {
    if (!isLoaded) return;
    if (!signUp) router.replace("/(public)/sign-up");

    setIsLoading(true);

    try {
      const verified = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });
      setActive({ session: verified.createdSessionId });

      router.replace("/(protected)/(tabs)/");
    } catch (e) {
      if (isClerkError(e)) {
        return setErrorMessage(getClerkErrorMessage(e, DEFAULT_ERROR_MESSAGE));
      }
      if (e instanceof Error && "message" in e) {
        return setErrorMessage(e.message);
      }
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="font-bold text-2xl mb-8">Verify Email</Text>
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
