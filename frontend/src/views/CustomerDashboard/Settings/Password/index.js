import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import InputField from "../../../../components/InputField";
import { parseError } from "../../../../services/errorHandler";
import { getPasswordValidationRules } from "../../../../helpers/common";
import IconCheck from "../../../../assets/svg/icon_check.svg";
import CheckIcon from "../../../../assets/svg/icon_check_big.svg";

import { PasswordRule, PasswordStrengthLevel } from "../../../../types/common";

export default function Password() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [strength, setStrength] = useState("");
  const [strengthColor, setStrengthColor] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const passwordRules = getPasswordValidationRules();

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const onResetPassword = async (e) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);

    delay(1000).then(async () => {
      //Delay needed to complete animation at loading screen
      try {
        //await resetPassword({ code: passwordToken, password: password });

        navigate({
          pathname: "/reset-success",
        });
      } catch (err) {
        let errorMsg = parseError(err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    });
  };

  const getPasswordStrength = (validationResults) => {
    switch (validationResults.filter((item) => item.valid === true).length) {
      case 0:
        setStrength(PasswordStrengthLevel.Weak.description);
        setStrengthColor("text-coralRed");
        break;
      case 1:
        setStrength(PasswordStrengthLevel.Good.description);
        setStrengthColor("text-primary");
        break;
      case 2:
        setStrength(PasswordStrengthLevel.Strong.description);
        setStrengthColor("text-caribbeanGreen");
        break;
      default:
        setStrength("");
        setStrengthColor("text-regentGray");
    }
  };

  return (
    <div className="flex flex-1 flex-col w-[80%] md:w-1/2 mx-auto mb-[150px] mt-6">
      <h2 className=" text-xl md:text-2xl font-semibold text-mineShaft">
        Change password
      </h2>
      <form className=" w-full">
        <div className="mt-6">
          <InputField
            label="Current password"
            name="currentPassword"
            type={"password"}
            placeholder="Type your current password"
            value={currentPassword}
            onChange={(e) => {
              let value = e.target.value;
              setCurrentPassword(value);
            }}
            autocomplete="off"
          ></InputField>
        </div>
        <div className="mt-6">
          <InputField
            label="New password"
            name="password"
            type={"password"}
            placeholder="Type your password"
            value={password}
            onChange={(e) => {
              let value = e.target.value;
              setPassword(value);

              if (value) {
                let validationResults = Object.keys(passwordRules).map((r) => {
                  return {
                    rule: r,
                    valid: passwordRules[r].test(value.toString()),
                  };
                });
                setPasswordValid(validationResults.every((v) => v.valid));
                getPasswordStrength(validationResults);
              } else {
                setPasswordValid(true);
              }
            }}
          ></InputField>
        </div>
        <div className="mt-6">
          <InputField
            label="Confirm password"
            name="passwordConfirm"
            type={"password"}
            placeholder="Repeat the password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          ></InputField>
        </div>

        <div className="mt-6">
          <p className="text-xs text-regentGray">
            Password stregth:{" "}
            <span className={`text-xs ${strengthColor} font-semibold`}>
              {strength}
            </span>
          </p>
          <ul className="ml-2 mt-2.5 flex flex-col text-xs font-normal text-regentGray">
            <li className="flex items-center my-1">
              <div
                className={`rounded-full mr-3 ${
                  passwordRules[PasswordRule.Length.description].test(
                    password.toString()
                  )
                    ? "bg-[#00C48B]"
                    : "bg-[#D0D5E1]"
                }`}
              >
                <IconCheck height="22" width="22" fill="white" />
              </div>
              <p
                className={`${
                  passwordRules[PasswordRule.Length.description].test(
                    password.toString()
                  )
                    ? "text-[#00C48B]"
                    : "text-[#D0D5E1]"
                }`}
              >
                {" "}
                At least 8 characters
              </p>
            </li>
            <li className="flex items-center my-1">
              <div
                className={`rounded-full mr-3 ${
                  passwordRules[PasswordRule.SpecialOrNumber.description].test(
                    password.toString()
                  )
                    ? "bg-[#00C48B]"
                    : "bg-[#D0D5E1]"
                }`}
              >
                <IconCheck height="22" width="22" fill="white" />
              </div>
              <p
                className={`${
                  passwordRules[PasswordRule.SpecialOrNumber.description].test(
                    password.toString()
                  )
                    ? "text-[#00C48B]"
                    : "text-[#D0D5E1]"
                }`}
              >
                {" "}
                Contains 1 capital letter, 1 special character and 1 number
              </p>
            </li>
            <li className="flex items-center my-1">
              <div
                className={`rounded-full mr-3 ${
                  password == passwordConfirm && password != ""
                    ? "bg-[#00C48B]"
                    : "bg-[#D0D5E1]"
                }`}
              >
                <IconCheck height="22" width="22" fill="white" />
              </div>
              <p
                className={`${
                  password == passwordConfirm && password != ""
                    ? "text-[#00C48B]"
                    : "text-[#D0D5E1]"
                }`}
              >
                {" "}
                Both passwords must match
              </p>
            </li>
          </ul>
        </div>
      </form>
      <div className="w-full xl:hidden bg-white flex flex-col fixed left-4 bottom-0 py-4 ">
        <div
          onClick={() => showOverlay(false)}
          className="mr-8 py-4 flex justify-center items-center rounded-[32px] text-[13px] text-primary border border-porcelain"
        >
          Cancel
        </div>
        <div className="mr-8 py-1 mt-2 justify-center flex items-center rounded-[32px] text-[13px] text-white bg-primary">
          <CheckIcon fill="white"></CheckIcon>{" "}
          <div className="grow flex justify-center mr-4">Update password</div>
        </div>
      </div>
    </div>
  );
}
