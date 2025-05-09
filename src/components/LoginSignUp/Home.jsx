import React from "react";

import { Outlet } from "react-router-dom";
import "./Home.css";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import RightSidebar from "./RightSidebar";

const Home = () => {
    return (
        <div className="app">
          <TopBar />
          <div className="content-wrapper" style={{ display: "flex" }}>
            <Sidebar />
    
            <Outlet />
    
            <RightSidebar />
          </div>
        </div>
      );
    }

export default Home;