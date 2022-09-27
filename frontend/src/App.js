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
import AddressAndMortgages from "./views/CustomerDashboard/AddressAndMortgages";
/**/ import AMCurentMortgages from "./views/CustomerDashboard/AddressAndMortgages/AMCurentMortgages";
/**/ import AMAddressHistory from "./views/CustomerDashboard/AddressAndMortgages/AMAddressHistory";
import DashboardEmploymentHistory from "./views/CustomerDashboard/DashboardEmploymentHistory";
import DocumentsAndFiles from "./views/CustomerDashboard/DocumentsAndFiles";
import MyPortal from "./views/CustomerDashboard/MyPortal";
/**/ import MyBroker from "./views/CustomerDashboard/MyPortal/MyBroker";
/**/ import MyApprovalsContracts from "./views/CustomerDashboard/MyPortal/MyApprovalsContracts";
/**/ import MyMortgages from "./views/CustomerDashboard/MyPortal/MyMortgages";

import RegistroRH from "./views/Dashboard/RegistroRH";

import Settings from "./views/CustomerDashboard/Settings";
/**/ import SettingsPersonalInformation from "./views/CustomerDashboard/Settings/SettingsPersonalInformation";
/**/ import AccountFocus from "./views/CustomerDashboard/Settings/AccountFocus";
/**/ import Password from "./views/CustomerDashboard/Settings/Password";

import ProtectedRoute from "./components/ProtectedRoute";

import RegisterDetails from "./views/Dashboard/RegistroRH/RegisterDetails";
import NewRegister from "./views/Dashboard/RegistroRH/NewRegister";
import RegisterList from "./views/Dashboard/RegistroRH/RegisterList";
import EmployeeList from "./views/Dashboard/RegistroRH/EmployeeList";

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

        {/* Breeze auth */}
        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={true} />}>
          <Route element={<DashboardLayout />}>
            <Route path="home" element={<Home />} />
            <Route element={<AddressAndMortgages />}>
              <Route
                path="customer-current-mortgages"
                element={<AMCurentMortgages />}
              />
              <Route
                path="customer-address-history"
                element={<AMAddressHistory />}
              />
            </Route>
            <Route
              path="customer-employment-history"
              element={<DashboardEmploymentHistory />}
            />
            <Route
              path="customer-documents-files"
              element={<DocumentsAndFiles />}
            />
            <Route element={<MyPortal />}>
              <Route path="customer-my-mortgages" element={<MyMortgages />} />
              <Route
                path="customer-my-approvals-contracts"
                element={<MyApprovalsContracts />}
              />
              <Route path="customer-my-broker" element={<MyBroker />} />
            </Route>
            <Route element={<RegistroRH />}>
              <Route path="registros-rh" element={<RegisterList />} />
              <Route path="nuevo-registro-rh" element={<NewRegister />} />
              <Route path="detalles-registro-rh" element={<RegisterDetails />} />
              <Route path="lista-empleados-rh" element={<EmployeeList />} />

            </Route>

            <Route element={<Settings />}>
              <Route
                path="settings-personal-information"
                element={<SettingsPersonalInformation />}
              />

              <Route path="settings-password" element={<Password />} />
              <Route path="settings-account-focus" element={<AccountFocus />} />
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
