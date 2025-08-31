import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Post from "./post";

// Mock fetch function
global.fetch = jest.fn();

// Mock useParams hook
const mockUseParams = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockUseParams(),
}));

// Wrapper component for Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock data
const mockPost = {
  id: 1,
  title: "Test Post Title",
  body: "This is the test post body content",
};

describe("Post Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    mockUseParams.mockClear();
  });

  test("renders loading state initially", () => {
    mockUseParams.mockReturnValue({ id: "1" });
    fetch.mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves to keep loading state
    );

    renderWithRouter(<Post />);
    expect(screen.getByText("Loading post...")).toBeInTheDocument();
  });

  test("renders post after successful fetch", async () => {
    mockUseParams.mockReturnValue({ id: "1" });
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPost),
      })
    );

    renderWithRouter(<Post />);

    await waitFor(() => {
      expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    });

    expect(
      screen.getByText("This is the test post body content")
    ).toBeInTheDocument();
  });

  test("renders back button", async () => {
    mockUseParams.mockReturnValue({ id: "1" });
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPost),
      })
    );

    renderWithRouter(<Post />);

    await waitFor(() => {
      expect(screen.getByText("← Back to Posts")).toBeInTheDocument();
    });
  });

  test("renders error state when fetch fails", async () => {
    mockUseParams.mockReturnValue({ id: "1" });
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    renderWithRouter(<Post />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch post")
      ).toBeInTheDocument();
    });
  });

  test("renders error state when network error occurs", async () => {
    mockUseParams.mockReturnValue({ id: "1" });
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    renderWithRouter(<Post />);

    await waitFor(() => {
      expect(screen.getByText("Error: Network error")).toBeInTheDocument();
    });
  });

  test("renders not found when post has no title", async () => {
    mockUseParams.mockReturnValue({ id: "999" });
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    renderWithRouter(<Post />);

    await waitFor(() => {
      expect(screen.getByText("Post not found")).toBeInTheDocument();
    });
  });

  test("fetches post from correct API endpoint", async () => {
    mockUseParams.mockReturnValue({ id: "1" });
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPost),
      })
    );

    renderWithRouter(<Post />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
    });
  });

  test("does not fetch when id is not provided", () => {
    mockUseParams.mockReturnValue({ id: undefined });

    renderWithRouter(<Post />);

    expect(fetch).not.toHaveBeenCalled();
  });

  test("resets error state on new fetch", async () => {
    mockUseParams.mockReturnValue({ id: "1" });

    // First call fails
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { rerender } = renderWithRouter(<Post />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch post")
      ).toBeInTheDocument();
    });

    // Second call succeeds
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPost),
      })
    );

    // Simulate id change
    mockUseParams.mockReturnValue({ id: "2" });
    rerender(
      <BrowserRouter>
        <Post />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    });
  });
});
