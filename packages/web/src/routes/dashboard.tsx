import { UserButton } from "@clerk/clerk-react";

export default function DashboardPage() {
  return (
    <>
      <UserButton />
      <h1>Dashboard page</h1>
      <p>This is a protected page.</p>
    </>
  );
}
