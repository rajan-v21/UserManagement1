"use client";

import "./globals.css";
import client from "./api/graphql/apolloClient"; // Import the Apollo Client
import { ApolloProvider } from "@apollo/client";
import SideNav from './components/sidenav';
import Home from '@/app/page';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const searchParams = useSearchParams();
  const userFromUrl = searchParams.get("user"); // Get user from URL

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Sync the selectedUser with the URL parameter on initial render
  useEffect(() => {
    if (userFromUrl) {
      setSelectedUser(userFromUrl); // Set the selected user from URL
    }
  }, [userFromUrl]);

  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              {/* Pass the function to update the selected user */}
              <SideNav onSelectUser={setSelectedUser} />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              {/* Pass the selected user to the Home component */}
              <Home selectedUser={selectedUser} />
            </div>
          </div>
        </body>
      </html>
    </ApolloProvider>
  );
}
