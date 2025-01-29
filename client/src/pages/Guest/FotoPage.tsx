import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SentPhoto } from "../../models/SentPhoto";

function FotoPage() {
  const [searchParams] = useSearchParams();
  var tokenFromUrl = searchParams.get("token");

  const [photoData, setFormData] = useState<SentPhoto>({
    token: "53423342",
    photoBase64: "",
  });

  const [tekst, setTekst] = useState("Zrób zdjecie");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      convertToBase64(selectedFile);
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === "string") {
        setFormData((prevData: SentPhoto) => ({
          ...prevData,
          photoBase64: (reader.result as string).split(",")[1], // Usuwa prefiks `data:...;base64,`
        }));
      }
    };
    reader.onerror = (error) => {
      console.error("Błąd podczas odczytu pliku:", error);
    };
    reader.readAsDataURL(file); // Rozpoczyna konwersję
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormData((prev: SentPhoto) => ({
      ...prev,
      token: tokenFromUrl as string,
    }));
    //console.log("Rejestracja:", formData);

    setTekst("Zdjęcie wysłane!");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photoData),
    };
    
    fetch("http://192.168.100.12:5000/api/foto", requestOptions)
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          {tekst}
        </h1>

        <label
          htmlFor="picture"
          className="block text-sm font-medium text-gray-700"
        >
          Wybierz zdjęcie
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Prześlij
        </button>
      </form>
    </div>
  );
}

export default FotoPage;
