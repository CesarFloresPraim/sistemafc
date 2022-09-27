import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import EyeOffIcon from "../assets/svg/icon_view.svg";
import EyeIcon from "../assets/svg/icon_view.svg";

export default function InputField({
  label,
  type = "text",
  name,
  errorMessage,
  placeholder,
  prefixIcon,
  validateExpression,
  onValidationChange,
  onChange,
  defaultValue,
  disabled,
  autocomplete = "off",
}) {
  const [intermediateType, setIntermediateType] = useState(type);
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    if (onValidationChange !== undefined) {
      onValidationChange(!errorState);
    }
  }, [errorState]);

  const validationFunc = useDebouncedCallback((value) => {
    if (validateExpression !== undefined) {
      const vResult = validateExpression.test(value);
      changeErrorState(vResult);
    }
    //! Missing function validation for password
  }, 700);

  const changeErrorState = (isError) => {
    setErrorState(!isError);
  };

  const onInputChange = (e) => {
    if (onChange !== undefined) {
      onChange(e);
    }
    validationFunc(e.target.value);
  };

  const PrefixIcon = () => {
    return prefixIcon;
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="email"
        className={`block text-[16px] font-bold font-poppins text-mineShaft ${
          errorState ? "text-error" : "text-black"
        }`}
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md flex items-center justify-center">
        <input
          autoComplete={autocomplete}
          disabled={disabled}
          type={intermediateType}
          name={name}
          id={name}
          className={`block h-16 w-full px-6 pl-4 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal ${
            errorState ? "" : ""
          } ${disabled ? "" : ""} ${
            type == "password" ? "tracking-widest" : ""
          }`}
          placeholder={placeholder}
          aria-invalid="true"
          aria-describedby="email-error"
          defaultValue={defaultValue}
          onChange={onInputChange}
        />
        {prefixIcon && (
          <div className="flex items-center justify-center absolute right-[36px] h-9 w-9 cursor-pointer text-gray-400">
            {prefixIcon()}
          </div>
        )}
        {type === "password" && (
          <div
            onClick={() => {
              setIntermediateType((prev) =>
                prev === "text" ? "password" : "text"
              );
            }}
            className="absolute right-[48px] top-[8px] h-4 w-4 cursor-pointer text-gray-400"
          >
            {intermediateType === "text" ? (
              <EyeIcon fill="grey" />
            ) : (
              <EyeOffIcon fill="grey" />
            )}
          </div>
        )}
      </div>
      {errorMessage && errorState && (
        <p
          className={`mt-2 text-xs ${errorState ? "text-error" : "text-black"}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
