// import surati from './logo.svg';
import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {

  return (
    <div>
      <header>
        <div className="logo">TAMARA's Page</div>
        <div className='links'>
          <Link to={''}> მთავარი </Link>
          <Link to={'posts'}> პოსტები </Link>
          <Link to={'about'}> ჩვენს შესახებ </Link>
        </div>
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
