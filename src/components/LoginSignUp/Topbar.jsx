import React from "react";
import { FiSearch } from "react-icons/fi";
import "./Home.css";
import logo from "../../assets/RougeSecret.png";
import { FiMessageCircle } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import man from "../../assets/man.jpg"


export default function TopBar() {
  return (
    <header className="top-bar">
        <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="search-bar-container">
            <div className="search-bar">
                <FiSearch /> <input type="text" placeholder="Type in Search" />
            </div>
            <button className="gender-btn">Gender</button>
        </div>
        <div className="nav-icons">
            <div className="nav-icon"><FiMessageCircle /></div>
            <div className="nav-icon"><IoMdNotificationsOutline /></div>
            <img src={man} alt="User" className="user-avatar" />
        </div>
    </header>
  );
}
