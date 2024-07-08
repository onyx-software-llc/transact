import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import AuthProvider from "@/lib/providers/AuthProvider";

/**
 * @returns Outlet - which will resolve into a Child element
 * defined in createBrowserRouter config
 */
export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
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
