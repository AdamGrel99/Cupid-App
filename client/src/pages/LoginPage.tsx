import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { User } from "../models/User";
import BackgroundWithCupids from "../components/HomePage/BackgroundWithCupids";

function LoginPage() {
  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    token: "",
    role: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logowanie:", formData);
    // Wyślij dane do API logowania
  };

  return (
    <header className="w-full flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <BackgroundWithCupids />
      <AuthForm
        title="Logowanie"
        onSubmit={handleSubmit}
        footerText="Nie masz konta?"
        footerLink="/register"
        footerLinkText="Zarejestruj się"
      >
        <FormInput
          id="email"
          name="email"
          type="email"
          label="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Wpisz swój e-mail"
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Hasło"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Wpisz swoje hasło"
        />
      </AuthForm>
    </header>
  );
}

export default LoginPage;
