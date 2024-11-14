import { useClerk } from "@clerk/clerk-expo";
import { Text, TouchableOpacity } from "react-native";

// DEV: Temporary button to sign out
export default function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text className="dark:text-white">Sign Out</Text>
    </TouchableOpacity>
  );
}
