import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { User } from "../models/User";

function LoginPage() {
  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
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
  );
}

export default LoginPage;
