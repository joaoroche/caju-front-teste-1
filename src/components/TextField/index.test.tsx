import TextField from ".";
import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom'; 

describe("TextField Component", () => {
  test("renders without crashing", () => {
    render(<TextField />);
  });

  test("renders the label correctly", () => {
    const label = "Username";
    render(<TextField label={label} id="username" />);
    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test("renders the input element correctly", () => {
    render(<TextField id="username" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("displays an error message when provided", () => {
    const errorMessage = "This field is required";
    render(<TextField error={errorMessage} />);
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveStyle({ color: 'red' });
  });
});