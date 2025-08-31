import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./counter";

describe("Counter Component", () => {
  test("renders counter with initial value", () => {
    render(<Counter />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("increments counter when increment button is clicked", () => {
    render(<Counter />);

    const incrementButton = screen.getByText("გაზრდა");
    fireEvent.click(incrementButton);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("decrements counter when decrement button is clicked", () => {
    render(<Counter />);

    const decrementButton = screen.getByText("კლება");
    fireEvent.click(decrementButton);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("does not decrement below zero", () => {
    render(<Counter />);

    const decrementButton = screen.getByText("კლება");

    // Click 4 times to try to go below 0
    fireEvent.click(decrementButton); // 3 -> 2
    fireEvent.click(decrementButton); // 2 -> 1
    fireEvent.click(decrementButton); // 1 -> 0
    fireEvent.click(decrementButton); // Should stay 0

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders both buttons", () => {
    render(<Counter />);

    expect(screen.getByText("გაზრდა")).toBeInTheDocument();
    expect(screen.getByText("კლება")).toBeInTheDocument();
  });

  test("multiple increments work correctly", () => {
    render(<Counter />);

    const incrementButton = screen.getByText("გაზრდა");

    fireEvent.click(incrementButton); // 3 -> 4
    fireEvent.click(incrementButton); // 4 -> 5
    fireEvent.click(incrementButton); // 5 -> 6

    expect(screen.getByText("6")).toBeInTheDocument();
  });

  test("increment and decrement work together", () => {
    render(<Counter />);

    const incrementButton = screen.getByText("გაზრდა");
    const decrementButton = screen.getByText("კლება");

    fireEvent.click(incrementButton); // 3 -> 4
    fireEvent.click(incrementButton); // 4 -> 5
    fireEvent.click(decrementButton); // 5 -> 4
    fireEvent.click(incrementButton); // 4 -> 5

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
