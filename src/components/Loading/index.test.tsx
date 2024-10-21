import { Loading } from ".";
import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom'; 

describe("<Loading />", () => {
  it("Should render the loading component", () => {
    render(<Loading />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Should have aria-live set to assertive", () => {
    render(<Loading />);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("Should have aria-busy set to true", () => {
    render(<Loading />);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-busy", "true");
  });

  it("Should contain visually hidden text", () => {
    render(<Loading />);
    expect(screen.getByText(/carregando, aguarde um momento.../i)).toBeInTheDocument();
  });
});
