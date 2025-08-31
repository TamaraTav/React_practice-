// import surati from './logo.svg';
import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {

  return (
    <div>
      <header>
        <div className="logo">TAMARA's Page</div>
        <div className='links'>
          <Link to={''}> Home </Link>
          <Link to={'posts'}> Posts </Link>
          <Link to={'about'}> About us </Link>
        </div>
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
