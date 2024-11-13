import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { useState } from "react";

import { DEFAULT_ERROR_MESSAGE } from "../constants/ERROR_MESSAGE";
import { getClerkErrorMessage } from "../lib/clerk";
import { isClerkError } from "../lib/clerk";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Signup() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignUpSchema) => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/(public)/verify-email");
    } catch (e: unknown) {
      console.log(
        "Error thrown during sign up, attempting to handle",
        JSON.stringify(e, null, 2)
      );
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
      <Text className="font-bold text-2xl mb-8">Sign up</Text>

      <View className="w-full space-y-4">
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
          />
        </View>

        <View>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5">
        <Text>Already have an account?</Text>
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={() => router.push("/(public)/sign-in")}
        >
          <Text className="text-white text-center font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
