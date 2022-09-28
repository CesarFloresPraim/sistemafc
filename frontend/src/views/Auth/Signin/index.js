import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Link,
  Navigate,
  createSearchParams,
} from "react-router-dom";

import InputField from "../../../components/InputField";
import { parseError } from "../../../services/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import { SignIn } from "../../../store/actionCreators/auth";


export default function Signin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    let credentials = {
      username: username,
      password: password
    }
    dispatch(SignIn(credentials)).then(res => {
      navigate({pathname: "/home"})
    }).catch(err => {
      console.log(err);
    })
  };

  const buttonDisabled = () => {
    return (
      !username ||
      username.length == 0 ||
      !password ||
      password.length == 0
    );
  };

  return (
    <div className="m-auto w-10/12 md:w-7/12">
      <form onSubmit={onLogin}>
        <h2 className=" text-3xl md:text-5xl font-bold font-poppins text-mineShaft">
          Bienvenido a <span className="text-primary"> FC Sistema</span>{" "}
        </h2>
        <p className="mt-2 font-light text-base md:text-lg font-poppins text-regentGray">
          Porfavor ingresa con las credenciales que se te otorgaron
        </p>
        <InputField
          label="Usuario"
          placeholder="Usuario"
          type="text"
          formNoValidate
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></InputField>
        <InputField
          label="Contraseña"
          name="password"
          type={"password"}
          placeholder="Escribe tu contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></InputField>

        <button
          disabled={buttonDisabled()}
          type="submit"
          className={`primary mt-6 p-3 w-full justify-center text-center text-white rounded-[32px] ${
            buttonDisabled() ? "bg-mischka" : "bg-primary"
          }`}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

//Mobile ready
