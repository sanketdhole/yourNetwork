import { render, screen } from "@testing-library/react";
import App from "./App";

test("render main page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to connections/i);
  expect(linkElement).toBeInTheDocument();
});

test("render user creation card", () => {
  render(<App />);
  const createUserElement = screen.getByText(/Create New User/i);
  expect(createUserElement).toBeInTheDocument();
});
