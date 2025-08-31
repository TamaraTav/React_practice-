import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import App from "./App";
import Posts from "./page/posts";
import Post from "./page/post";

// Styles
import "./index.css";

// Performance monitoring
import reportWebVitals from "./reportWebVitals";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <div>Home Page</div>,
      },
      {
        path: "about",
        element: <div>About Us</div>,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
    ],
  },
]);

// Root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Performance monitoring
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
