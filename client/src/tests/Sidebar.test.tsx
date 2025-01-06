import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
import "@testing-library/jest-dom";

describe("Sidebar Component", () => {
  const mockLogout = jest.fn();
  const mockSettings = jest.fn();
  const mockSave = jest.fn();
  const mockExport = jest.fn();
  const mockWeddingCard = jest.fn();

  it("should render all buttons", () => {
    render(
      <Sidebar
        onLogout={mockLogout}
        onSettings={mockSettings}
        onSave={mockSave}
        onExport={mockExport}
        onWeddingCard={mockWeddingCard}
      />
    );

    expect(screen.getByText(/Wyloguj się/i)).toBeInTheDocument();
    expect(screen.getByText(/Ustawienia/i)).toBeInTheDocument();
    expect(screen.getByText(/Zapisz/i)).toBeInTheDocument();
    expect(screen.getByText(/Eksportuj do PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/Eksportuj do HTML/i)).toBeInTheDocument();
    expect(screen.getByText(/Eksportuj do DOCX/i)).toBeInTheDocument();
    expect(screen.getByText(/Generuj Wizytówkę/i)).toBeInTheDocument();
  });

  it("should call appropriate functions when buttons are clicked", () => {
    render(
      <Sidebar
        onLogout={mockLogout}
        onSettings={mockSettings}
        onSave={mockSave}
        onExport={mockExport}
        onWeddingCard={mockWeddingCard}
      />
    );

    fireEvent.click(screen.getByText(/Wyloguj się/i));
    expect(mockLogout).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/Ustawienia/i));
    expect(mockSettings).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/Zapisz/i));
    expect(mockSave).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/Eksportuj do PDF/i));
    expect(mockExport).toHaveBeenCalledWith("pdf");

    fireEvent.click(screen.getByText(/Generuj Wizytówkę/i));
    expect(mockWeddingCard).toHaveBeenCalled();
  });
});
