import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { QrData } from "../models/QrData";
import Sidebar from "../components/Sidebar";

function CardQrPage() {
  const [formData, setFormData] = useState<QrData>({
    token: "53423342",
    date: "",
    manName: "",
    womanName: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  var tokenFromUrl = searchParams.get("token");
  useEffect(() => {
    if (tokenFromUrl) {
      setFormData((prev) => ({ ...prev, token: tokenFromUrl as string }));
      console.log("Token zaktualizowany w formData:", tokenFromUrl);
    }
  }, [tokenFromUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rejestracja:", formData);

    setFormData((prev: QrData) => ({ ...prev, token: tokenFromUrl as string }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch("http://192.168.100.12:5000/api/generate_qr_card", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas żądania: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Lokacja: ", data.location); // Pobiera location z odpowiedzi
      })
      .catch((error) => console.error("Błąd: ", error));

    // Wyślij dane do API rejestracji
  };

  const handleLogout = () => {
    console.log("Log out");
  };

  const handleCreateEvent = () => {
    console.log("Create Event");
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        buttons={[
          { label: "Wyloguj się", onClick: handleLogout },
          { label: "Utwórz Wydarzenie", onClick: handleCreateEvent },
        ]}
      />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center">Rejestracja</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Data wydarzenia
              </label>
              <input
                id="date"
                name="date"
                type="text"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz datę wydarzenia"
              />
            </div>
            <div>
              <label
                htmlFor="manName"
                className="block text-sm font-medium text-gray-700"
              >
                Pan młody
              </label>
              <input
                id="manName"
                name="manName"
                type="text"
                value={formData.manName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz imię pana młodego"
              />
            </div>
            <div>
              <label
                htmlFor="womanName"
                className="block text-sm font-medium text-gray-700"
              >
                Pani młoda
              </label>
              <input
                id="womanName"
                name="womanName"
                type="text"
                value={formData.womanName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz imię pani młodej"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Wygeneruj ulotkę!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardQrPage;
