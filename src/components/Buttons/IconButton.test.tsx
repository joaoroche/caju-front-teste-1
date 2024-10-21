import { IconButton } from "./IconButton";
import { render, screen, } from "@testing-library/react";
import '@testing-library/jest-dom'; 

describe("<IconButton> {children} </IconButton>", () => {
  it("Should show button", () => {
    render(<IconButton>Ativar</IconButton>);
    expect(screen.getByRole("button", { name: /ativar/i })).toBeInTheDocument(); 
  });
});
