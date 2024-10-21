import { Error } from ".";
import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AxiosError } from "axios";



describe("<Error {...props} />", () => {

  it("Should display a generic error message when no response or request is present", () => {
    const error = { message: "Network Error" } as AxiosError;
    render(<Error error={error} />);
    expect(screen.getByTestId("error-message")).toHaveTextContent("Network Error");
    expect(screen.queryByTestId("error-details")).not.toBeInTheDocument();
  });

  it("Should display a communication error message when request is present", () => {
    const error = { request: "Request failed" } as AxiosError;
    render(<Error error={error} />);
    expect(screen.getByTestId("error-message")).toHaveTextContent("Ops! Ocorreu um erro ao tentar se comunicar com o servidor.");
    expect(screen.getByTestId("error-details")).toHaveTextContent("Request failed");
  });
});
