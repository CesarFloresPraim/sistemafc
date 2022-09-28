import React, { useState, useEffect, memo } from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Assets from "./assets";

//Breexe auth
import AuthLayout from "./layout/auth";

import Signin from "./views/Auth/Signin";

//Breeze broker dashboard
import DashboardLayout from "./layout/dashboard";
import Home from "./views/Dashboard/Home";


import RegistroRH from "./views/Dashboard/RegistroRH";
import RegisterDetails from "./views/Dashboard/RegistroRH/RegisterDetails";
import NewRegister from "./views/Dashboard/RegistroRH/NewRegister";
import RegisterList from "./views/Dashboard/RegistroRH/RegisterList";
import EmployeeList from "./views/Dashboard/RegistroRH/EmployeeList";


import ProtectedRoute from "./components/ProtectedRoute";



function App(props) {
  const { auth } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        {/* route not found */}
        <Route path="*" element={<Navigate to="/home" />} />

        {/* main page */}
        {/* <Route path="/" element={<Home />}>
       
          <Route index element={<Navigate to="/home" />} />

    
          <Route path="home" element={<Home />}></Route>
        </Route> */}

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={auth.accessToken} />}>
          <Route element={<DashboardLayout />}>
            <Route path="home" element={<Home />} />
            <Route element={<RegistroRH />}>
              <Route path="registros-rh" element={<RegisterList />} />
              <Route path="nuevo-registro-rh" element={<NewRegister />} />
              <Route path="detalles-registro-rh" element={<RegisterDetails />} />
              <Route path="lista-empleados-rh" element={<EmployeeList />} />

            </Route>
          </Route>
        </Route>

        {/* other pages */}
        <Route path="/assets" element={<Assets />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
