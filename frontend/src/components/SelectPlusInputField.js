import React, { useState, useEffect } from "react";

import { formatPhoneNumber } from "../helpers/phoneNumber";

import EyeOffIcon from "../assets/svg/icon_view.svg";
import EyeIcon from "../assets/svg/icon_view.svg";

export default function SelectPlusInputField({
  type = "text",
  name,
  label,
  placeholder,
  onChange,
  prefixIcon,
  disabled,
  selectName,
  value,
  selectValue,
}) {
  const onInputChange = (e) => {
    if (onChange !== undefined) {
      //console.log(e.target.value);

      e.target.value = formatPhoneNumber(e.target.value);
      onChange(e, true);
    }
  };

  const handleSelectChange = (e) => {
    if (onChange !== undefined) {
      onChange(e, false);
    }
  };

  const PrefixIcon = () => {
    return prefixIcon;
  };

  return (
    <div className="mt-4">
      <div>
        <label
          htmlFor={name}
          className="block text-[16px] font-semibold text-black"
        >
          {label}
        </label>
        <div className="mt-1 relative rounded-[32px] bg-whiteLilac">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label htmlFor={name} className="sr-only">
              {label}
            </label>
            <select
              value={selectValue}
              name={selectName}
              className=" h-full py-0 pl-4 pr-7 border-transparent bg-transparent sm:text-sm font-medium rounded-[32px] outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal"
              onChange={handleSelectChange}
            >
              <option value="+1">CA</option>
              <option value="+1">US</option>
              <option value="+52" disabled>
                MX
              </option>
            </select>
          </div>
          <input
            disabled={disabled}
            type={type}
            name={name}
            id={name}
            className={`block w-full px-6 py-4 pl-16 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mineShaft placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal `}
            placeholder={placeholder}
            aria-invalid="true"
            aria-describedby="email-error"
            value={value}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
}
