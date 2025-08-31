import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">TAMARA's Page</div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/about">About us</Link>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
