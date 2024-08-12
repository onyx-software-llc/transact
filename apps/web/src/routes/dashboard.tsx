import LinkPlaid from "@/components/LinkPlaid";
import { useAuthContext } from "@/lib/providers/AuthProvider";

export default function DashboardPage() {
  const { linkToken } = useAuthContext();

  return (
    <>
      <h1>Dashboard page</h1>
      <p>This is a protected page.</p>
      {linkToken && <LinkPlaid linkToken={linkToken} />}
    </>
  );
}
