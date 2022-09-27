import React, { useEffect, useState } from "react";
import {
  useNavigate,
  Link,
  Navigate,
  createSearchParams,
} from "react-router-dom";
import InputField from "../../../components/InputField";
import CheckboxField from "../../../components/CheckboxField";
import { parseError } from "../../../services/errorHandler";
import { useSelector, useDispatch } from "react-redux";
import {
  LoginStatus,
  SetAuthDetails,
  SetAuthError,
} from "../../../store/actionCreators/auth";

export default function Signin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.auth);
  const { errorMessage } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogged, setKeepLogged] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      let startDate = new Date(foundUser.startDate);
      let now = new Date();
      const msBetweenDates = Math.abs(startDate.getTime() - now.getTime());
      //  convert ms to days                 hour   min  sec   ms
      const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

      if (daysBetweenDates < 30) {
        localStorage.setItem("access_token", foundUser.tokens?.accessToken);
        localStorage.setItem("refresh_token", foundUser.tokens?.refreshToken);
        dispatch(SetAuthDetails(foundUser));
        navigate("/broker-home");
      } else {
        localStorage.clear();
      }
    }
  }, []);

  useEffect(() => {
    if (
      !errorMessage ||
      errorMessage === "Incomplete profile information" ||
      errorMessage === "User has not been confirmed"
    ) {
      if (
        loginStatus?.status === "UNCONFIRMED" ||
        errorMessage === "User has not been confirmed"
      ) {
        const encodedEmail = encodeURIComponent(email);
        navigate(`/email-confirm?email=${encodedEmail}`);
      } else if (loginStatus?.status === "COMPLETED") {
        navigate("/customer-home");
      }
    }
  }, [loginStatus]);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const onLogin = async (e) => {
    e.preventDefault();
    setError(undefined);
    dispatch(SetAuthError(""));
    setLoading(true);
    let obj = {
      email: email,
      password: password,
      keepLogged: keepLogged,
    };
    dispatch(LoginStatus(obj));
  };

  const buttonDisabled = () => {
    return (
      !email ||
      email.length == 0 ||
      !emailValid ||
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
          label="Correo"
          placeholder="Correo electronico"
          type="email"
          value={email}
          formNoValidate
          validateExpression={
            /^([+\w-]+(?:\.[+\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
          }
          errorMessage="Invalid email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onValidationChange={(isValid) => {
            setEmailValid(isValid);
          }}
        ></InputField>
        <InputField
          label="Contraseña"
          name="password"
          type={"password"}
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></InputField>

        <button
          disabled={buttonDisabled()}
          type="submit"
          className={`primary mt-6 p-3 w-full justify-center text-center text-white rounded-[32px] ${
            buttonDisabled() ? "bg-mischka" : "bg-primary"
          } ${loading ? "loading" : ""}`}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

//Mobile ready
