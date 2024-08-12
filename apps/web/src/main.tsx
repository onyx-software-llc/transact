import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai/react";

import RootLayout from "@/layouts/root-layout.tsx";
import DashboardLayout from "@/layouts/dashboard-layout";

import IndexPage from "@/routes";
import SignInPage from "@/routes/sign-in";
import SignUpPage from "@/routes/sign-up";
import DashboardPage from "@/routes/dashboard";
import DashboardTransactionsPage from "@/routes/dashboard.transactions";
import DashboardAccounts from "@/routes/dashboard.accounts";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          {
            path: "/dashboard/transactions",
            element: <DashboardTransactionsPage />,
          },
          {
            path: "/dashboard/accounts",
            element: <DashboardAccounts />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <RouterProvider router={router} />
      </JotaiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
