import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import AuthProvider from "@/lib/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import { createLinkToken } from "@/lib/utils/createLinkToken";

/**
 * @returns Outlet - which will resolve into a Child element
 * defined in createBrowserRouter config
 */
export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["token"],
    queryFn: () => createLinkToken(userId!),
    enabled: isLoaded && !!userId,
  });

  if (data) console.log("response", data);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  return (
    <AuthProvider userId={userId}>
      <div className="flex flex-col w-screen">
        <Navbar />
        <div>{isLoaded && <Outlet />}</div>
      </div>
    </AuthProvider>
  );
}
