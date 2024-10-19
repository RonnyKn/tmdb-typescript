import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
