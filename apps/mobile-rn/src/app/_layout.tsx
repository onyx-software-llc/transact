import { PortalHost } from "@rn-primitives/portal";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useRouter, useSegments, Slot } from "expo-router";
import "../../global.css";

import { tokenCache } from "@/features/auth";
import { useEffect } from "react";
import { ThemeProvider } from "@/lib/theme";

// Required polyfill for PowerSync SDK
import "@azure/core-asynciterator-polyfill";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const powersyncEndpoint = process.env.EXPO_PUBLIC_POWERSYNC_ENDPOINT!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

if (!powersyncEndpoint) {
  throw new Error(
    "Missing PowerSync Endpoint. Please set EXPO_PUBLIC_POWERSYNC_ENDPOINT in your .env"
  );
}

function InitializeClerk() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inProtectedGroup = segments[0] === "(protected)";

    console.log("User changed: ", isSignedIn);

    // If the user is signed in and not in the protected group, redirect to the protected group
    if (isSignedIn && !inProtectedGroup) {
      router.replace("/(protected)/(tabs)");
    } else if (!isSignedIn) {
      router.replace("/(public)/sign-in");
    }
  }, [isSignedIn]);

  // Potentially catch errors here and return a fallback UI
  return <Slot />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <InitializeClerk />
        <PortalHost />
      </ClerkProvider>
    </ThemeProvider>
  );
}
