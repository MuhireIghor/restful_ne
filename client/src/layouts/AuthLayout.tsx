
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode; // Define prop type for children components
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex w-full gap-5 flex-col h-screen items-center justify-center bg-color-a4">
      <img src="/logo.png" className="w-22 h-22 object-cover" alt="Logo" />
      <div className="flex flex-col w-full border max-w-lg rounded-xl bg-white mt-4 p-8">
        {children}
        {/* Render children components passed to AuthLayout */}
      </div>
    </div>
  );
};

export default AuthLayout;
