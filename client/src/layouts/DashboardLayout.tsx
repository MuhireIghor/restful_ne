import NavBar from "@/components/shared/navbar"; // Importing the navigation bar component
import Sidebar from "@/components/shared/sidebar"; // Importing the sidebar component
import { useAuth } from "@/contexts/AuthProvider"; // Importing the useAuth hook from AuthProvider context
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Importing Helmet from react-helmet-async for managing document head

interface Props {
  children: React.ReactNode; // Define prop type for children components
  right?: React.ReactNode; // Define prop type for right-aligned content in NavBar
}

const DashboardLayout: FC<Props> = ({ children, right }) => {
  const { user } = useAuth(); // Accessing user data from the useAuth hook

  useEffect(() => {
    if (!user) return; // Effect to handle user authentication changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Dependency array for useEffect to watch changes in user object

  return (
    <>
      <div className="w-full flex min-h-screen">
        <Sidebar /> {/* Render sidebar component */}
        <div className="flex w-full bg-[#FAFAFB] flex-col 2md:pl-[220px]">
          <NavBar right={right} /> {/* Render navigation bar with optional right-aligned content */}
          {children} {/* Render children components */}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
