import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("LoginPage Component", () => {
  it("should render the login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();
  });

  it("should handle form submission", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Hasło/i), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText(/E-mail/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/Hasło/i)).toHaveValue("password123");
  });
});
