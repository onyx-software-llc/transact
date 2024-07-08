import { UserButton } from "@clerk/clerk-react";

export default function NavBar() {
  return (
    <div className="w-screen h-full bg-red-500">
      <UserButton />
    </div>
  );
}
