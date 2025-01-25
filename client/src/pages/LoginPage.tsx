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

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
  console.log("Logowanie:", formData);

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Upewnij się, że wysyłasz JSON
      },
      body: JSON.stringify(formData),  // Zamiana formData na JSON
    });

    if (!response.ok) {
      throw new Error("Błąd logowania: " + response.status);
    }

    const data = await response.json();
    console.log("Logowanie zakończone sukcesem:", data);

    // Jeśli logowanie zakończone sukcesem, np. zapisz token w stanie aplikacji lub w localStorage
    // localStorage.setItem("user_token", data.token); // Jeśli używasz tokenu
    // Możesz także przekierować użytkownika do innej strony po udanym logowaniu
    // history.push("/dashboard"); // Jeśli używasz react-router

  } catch (error) {
    console.error("Błąd logowania:", error);
  }
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
