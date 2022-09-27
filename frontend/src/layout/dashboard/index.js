import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LeftNavbar from "./LeftNavbar";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate({ pathname: "/signin" });
  };

  return (
    <div className="min-h-screen font-poppins flex flex-col md:flex-row">
      <LeftNavbar handleLogout={handleLogout}></LeftNavbar>
      <div
        className={`flex flex-col h-screen flex-1 ml-[300px] overflow-x-hidden hide-scrollbar`}
      >
        <Outlet />
      </div>
    </div>
  );
}
