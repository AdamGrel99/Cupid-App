import React, { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { SentPhoto } from "../../models/SentPhoto";

function FotoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  var tokenFromUrl = searchParams.get("token");

  const [photoData, setFormData] = useState<SentPhoto>({
    //useeffect
    token: "53423342",
    photoBase64: "",
  });

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

  const [tekst, setTekst] = useState("Tekst hellooooo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormData((prev: SentPhoto) => ({
      ...prev,
      token: tokenFromUrl as string,
    }));
    //console.log("Rejestracja:", formData);

    setTekst("posłano!");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photoData),
    };
    fetch("http://192.168.10.102:5000/api/send_photo", requestOptions)
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
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-3xl font-bold underline">{tekst}</h1>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          // onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ cursor: "pointer" }}
        >
          Wygeneruj ulotkę!
        </button>
      </form>
    </>
  );
}

export default FotoPage;
