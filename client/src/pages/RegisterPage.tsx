import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { User } from "../models/User";
import BackgroundWithCupids from "../components/HomePage/BackgroundWithCupids";

function RegisterPage() {
  const [formData, setFormData] = useState<User>({
    id: "1",
    email: "",
    password: "",
    name: "",
    surname: "3",
    token: "4",
    role: "couple",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    console.log("Rejestracja:", formData);

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Upewnij się, że wysyłasz JSON
        },
        body: JSON.stringify(formData),  // Zamiana formData na JSON
      });

      if (!response.ok) {
        throw new Error("Błąd rejestracji: " + response.status);
      }

      const data = await response.json();
      console.log("Rejestracja zakończona sukcesem:", data);
      //przekierowanie do home
    } catch (error) {
      console.error("Błąd rejestracji:", error);
    }
  };
  

  // TODO
  // Potwierdzenie Regulaminu, Powtórz hasło.

  return (
    <header className="w-full flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <BackgroundWithCupids />
      <AuthForm
        title="Rejestracja"
        onSubmit={handleSubmit}
        footerText="Masz już konto?"
        footerLink="/login"
        footerLinkText="Zaloguj się"
      >
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Imię"
          value={formData.name || ""}
          onChange={handleInputChange}
          placeholder="Wpisz swoje imię"
        />
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

export default RegisterPage;
