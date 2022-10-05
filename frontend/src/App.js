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
import ProtectedRoute from "./components/ProtectedRoute";

import Signin from "./views/Auth/Signin";


import DashboardLayout from "./layout/dashboard";
import Home from "./views/Dashboard/Home";


import RegistroRH from "./views/Dashboard/RegistroRH";
import RegisterList from "./views/Dashboard/RegistroRH/RegisterList";
import EmployeeList from "./views/Dashboard/RegistroRH/EmployeeList";

import NewRegister from "./views/Dashboard/RegistroRH/CreateRegister/NewRegister";
import OvertimeAttendanceRegister from "./views/Dashboard/RegistroRH/CreateRegister/OvertimeAttendanceRegister";
import SmallBoxRegister from "./views/Dashboard/RegistroRH/CreateRegister/SmallBoxRegister";
import FoodRegister from "./views/Dashboard/RegistroRH/CreateRegister/FoodRegister";

import RegisterDetails from "./views/Dashboard/RegistroRH/RegisterDetails";
import EditRegister from "./views/Dashboard/RegistroRH/UpdateRegister/EditRegister";
import EditFoodRegister from "./views/Dashboard/RegistroRH/UpdateRegister/EditFoodRegister";
import EditSmallBoxRegister from "./views/Dashboard/RegistroRH/UpdateRegister/EditSmallBoxRegister";
import EditOvertimeAttendanceRegister from "./views/Dashboard/RegistroRH/UpdateRegister/EditOvertimeAttendanceRegister";

import Perceptions from "./views/Dashboard/Perceptions";
import AssignPerception from "./views/Dashboard/Perceptions/AssignPerception";
import PerceptionTypes from "./views/Dashboard/Perceptions/PerceptionTypes";

import Deductions from "./views/Dashboard/Deductions";
import AssignDeduction from "./views/Dashboard/Deductions/AssignDeduction";
import DeductionTypes from "./views/Dashboard/Deductions/DeductionTypes";
import Employees from "./views/Dashboard/Employees";



function App(props) {
  const { auth } = useSelector((state) => state.auth);

  return (
    <div className="text-mineShaft font-poppins">
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
            <Route path="empleados" element={<Employees />} />
            <Route element={<RegistroRH />}>
              <Route path="registros-rh" element={<RegisterList />} />
              <Route path="detalles-registro-rh" element={<RegisterDetails />} />
              <Route path="nuevo-registro-rh" element={<NewRegister />} />
              <Route path="lista-empleados-rh" element={<EmployeeList />} />
              <Route path="comida-registro-rh" element={<FoodRegister />} />
              <Route path="caja-chica-registro-rh" element={<SmallBoxRegister />} />
              <Route path="horas-extra-registro-rh" element={<OvertimeAttendanceRegister />} />
              <Route path="editar-registro-rh" element={<EditRegister />} />
              <Route path="editar-comida-registro-rh" element={<EditFoodRegister />} />
              <Route path="editar-caja-chica-registro-rh" element={<EditSmallBoxRegister />} />
              <Route path="editar-horas-extra-registro-rh" element={<EditOvertimeAttendanceRegister />} />
            </Route>
            <Route element={<Perceptions />}>
              <Route path="asignar-percepcion" element={<AssignPerception />} />
              <Route path="tipo-percepcion" element={<PerceptionTypes />} />
            </Route>
            <Route element={<Deductions />}>
              <Route path="asignar-deduccion" element={<AssignDeduction />} />
              <Route path="tipo-deduccion" element={<DeductionTypes />} />
            </Route>
          </Route>
        </Route>

        {/* other pages */}
        <Route path="/assets" element={<Assets />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
