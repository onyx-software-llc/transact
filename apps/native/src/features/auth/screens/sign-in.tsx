import { useSignIn } from "@clerk/clerk-expo";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "expo-router";

import { DEFAULT_ERROR_MESSAGE } from "../constants/ERROR_MESSAGE";
import { isClerkError, getClerkErrorMessage } from "../lib/clerk";

/**
 * Not handling email validation here since Clerk does this.
 */
const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function Signin() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { control, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: SignInSchema) => {
    /**
     * Clerk must be loaded before we can sign in
     */
    if (!isLoaded) {
      return setErrorMessage("Try again");
    }

    console.log("Start sign in flow");
    setIsLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      console.log("Sign in successful, setting active session", completeSignIn);

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (e: unknown) {
      console.log(
        "Error thrown during sign in, attempting to handle",
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
      console.log("(DEV) Sign in flow complete");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 dark:bg-white">
      <Text className="font-bold text-2xl mb-8 dark:text-white">Sign in</Text>

      <View className="w-full space-y-4">
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Email"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
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
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
        </View>

        {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-semibold">Sign in</Text>
        </TouchableOpacity>

        <View className="mt-5">
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            className="bg-blue-500 p-4 rounded-lg"
            onPress={() => router.push("/(public)/sign-up")}
          >
            <Text className="text-white text-center font-semibold">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
