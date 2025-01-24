import { Link } from "react-router-dom";
import BackgroundWithCupids from "../components/HomePage/BackgroundWithCupids";

function NotFoundPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <BackgroundWithCupids />
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-gray-900">404 Not Found</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-600 mb-8">
          Strona, którą szukasz nie istnieje.
        </p>
        <Link
          to="/"
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Powrót
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
