import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { SearchBar } from "./index";

describe("SearchBar Component", () => {
  const refetchMock = jest.fn();
  const history = createMemoryHistory();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Router history={history}>
        <SearchBar refetch={refetchMock} />
      </Router>
    );

  test("should render the SearchBar component correctly", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Digite um CPF válido")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Recarregar página/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Nova Admissão/i })).toBeInTheDocument();
  });

  test("should handle CPF input correctly", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Digite um CPF válido");

    fireEvent.change(input, { target: { value: "123.456.789-09" } });
    expect(input).toHaveValue("123.456.789-09");
    expect(screen.queryByText("CPF inválido")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "123" } });
    expect(screen.getByText("CPF inválido")).toBeInTheDocument();
  });

  test("should call refetch when refresh button is clicked", () => {
    renderComponent();
    const refreshButton = screen.getByRole("button", { name: /Recarregar página/i });

    fireEvent.click(refreshButton);
    expect(refetchMock).toHaveBeenCalled();
  });

  test("should navigate to new admission page when button is clicked", () => {
    renderComponent();
    const newAdmissionButton = screen.getByRole("button", { name: /Nova Admissão/i });

    fireEvent.click(newAdmissionButton);
    expect(history.location.pathname).toBe("/new-user");
  });
});