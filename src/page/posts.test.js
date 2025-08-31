import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Posts from "./posts";

// Mock fetch function
global.fetch = jest.fn();

// Wrapper component for Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock data
const mockPosts = [
  {
    id: 1,
    title: "Test Post 1",
    body: "This is test post 1 body",
  },
  {
    id: 2,
    title: "Test Post 2",
    body: "This is test post 2 body",
  },
];

describe("Posts Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders loading state initially", () => {
    fetch.mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves to keep loading state
    );

    renderWithRouter(<Posts />);
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  test("renders posts after successful fetch", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      })
    );

    renderWithRouter(<Posts />);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText("Test Post 1")).toBeInTheDocument();
      expect(screen.getByText("Test Post 2")).toBeInTheDocument();
    });

    // Check if links are rendered
    expect(screen.getByText("See more...")).toBeInTheDocument();
  });

  test("renders error state when fetch fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    renderWithRouter(<Posts />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch posts")
      ).toBeInTheDocument();
    });
  });

  test("renders error state when network error occurs", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    renderWithRouter(<Posts />);

    await waitFor(() => {
      expect(screen.getByText("Error: Network error")).toBeInTheDocument();
    });
  });

  test("fetches posts from correct API endpoint", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      })
    );

    renderWithRouter(<Posts />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts"
      );
    });
  });

  test("renders correct number of posts", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      })
    );

    renderWithRouter(<Posts />);

    await waitFor(() => {
      const postElements = screen.getAllByRole("heading", { level: 1 });
      expect(postElements).toHaveLength(2);
    });
  });
});
