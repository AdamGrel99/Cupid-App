import { Link } from "react-router-dom";
import MarqueeEffect from "../assets/animations/MarqueeEffect";
import BackgroundWithCupids from "../components/HomePage/BackgroundWithCupids";
import SectionWrapper from "../components/HomePage/SectionWrapper";
import AlbumFeature from "../components/HomePage/AlbumFeature";

// Zdjęcia
import albumImage from "../assets/images/homePage/pngegg.png";
import photosImage from "../assets/images/homePage/pngegg (1).png";
import printImage from "../assets/images/homePage/pngegg (2).png";
import saveImage from "../assets/images/homePage/pngegg (4).png";

// Fonty
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-center flex flex-col">
      <header className="w-full flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
        <MarqueeEffect
          title="Cupid"
          subtitle="Najlepsza aplikacja do uchwycenia najlepszych momentów weselnych."
        />
        <BackgroundWithCupids />
        <nav className="mt-4">
          <Link
            to="/login"
            className="text-lg font-semibold px-8 py-4 bg-white text-purple-600 rounded-lg shadow-md hover:bg-purple-200 mx-2"
          >
            Logowanie
          </Link>
          <Link
            to="/register"
            className="text-lg font-semibold px-8 py-4 bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-200 mx-2"
          >
            Rejestracja
          </Link>
        </nav>
        <button
          onClick={() => {
            const section = document.getElementById("album-features");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-8 w-16 h-16 bg-black/50 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-black/70"
        >
          <FontAwesomeIcon icon={faArrowDown} beat />
        </button>
      </header>

      <main className="flex-grow">
        <SectionWrapper
          id="album-features"
          title="Twój interaktywny album weselny"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AlbumFeature
              image={albumImage}
              title="Dodawanie zdjęć i tagów"
              description="Łatwo przesyłaj zdjęcia z aplikacji, przeciągaj je metodą drag’n’drop i dodawaj tagi, aby upamiętnić każdą chwilę."
            />
            <AlbumFeature
              image={photosImage}
              title="Personalizowanie albumu"
              description="Używaj naklejek, tekstów i różnych stylów, aby uczynić album wyjątkowym i dopasowanym do Twoich wspomnień."
            />
            <AlbumFeature
              image={printImage}
              title="Eksport i drukowanie"
              description="Eksportuj gotowy album jako plik PDF lub HTML, aby łatwo go wydrukować lub podzielić się nim online."
            />
            <AlbumFeature
              image={saveImage}
              title="Zapis i odczyt projektu"
              description="Zachowaj swój projekt albumu, aby edytować go w przyszłości lub odtworzyć każdą szczegółową chwilę."
            />
          </div>
        </SectionWrapper>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-white">
        <p>&copy; 2024 Cupid. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default HomePage;
