import React from "react";
import { NavLink } from "react-router-dom";

interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  children,
  onSubmit,
  footerText,
  footerLink,
  footerLinkText,
}) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {title}
        </button>
      </form>
      <div className="text-sm text-center">
        {footerText}{" "}
        <NavLink to={footerLink} className="text-blue-500 hover:underline">
          {footerLinkText}
        </NavLink>
      </div>
    </div>
  </div>
);

export default AuthForm;
