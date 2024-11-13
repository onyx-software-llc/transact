import { useClerk } from "@clerk/clerk-expo";
import { Text, TouchableOpacity } from "react-native";

export default function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign Out</Text>
    </TouchableOpacity>
  );
}
