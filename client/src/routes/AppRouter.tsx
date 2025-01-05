import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EditPage from "../pages/Guest/EditPage";
import FotoPage from "../pages/Guest/FotoPage";
import CardQrPage from "../pages/CardQrPage";
import WeddingPage from "../pages/Main/WeddingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/edit",
    element: (
      <EditPage imageUrl="https://www.swiatobrazu.pl/zdjecie/artykuly/552332/zdjecie-tygodnia.jpeg" />
    ),
  },
  {
    path: "/foto",
    element: <FotoPage />,
  },
  {
    path: "/main",
    element: <WeddingPage />,
  },
  {
    path: "/cardqr",
    element: <CardQrPage />,
  },
]);
