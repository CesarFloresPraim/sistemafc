import React, { useState, useEffect, useRef } from "react";

import InputField from "../../../../components/InputField";
import SelectPlusInputField from "../../../../components/SelectPlusInputField";
import CheckIcon from "../../../../assets/svg/icon_check_big.svg";

export default function SettingsPersonalInformation() {
  const [fullname, setFullName] = useState("Oscar Thomsen");
  const [dateOfBirth, setDateOfBirth] = useState("13 / 06 / 1994");
  const [email, setEmail] = useState("oscar@homelifemortgage.com");
  const [phone, setPhone] = useState("(123) 456 - 7890");

  return (
    <div className="grid grid-cols-1 py-6 px-6 md:px-16 gap-12">
      <div className="flex flex-col md:w-1/2 mx-auto mb-[150px]">
        <h2 className=" text-xl md:text-2xl font-semibold text-mineShaft">
          Personal information
        </h2>
        <div className="mt-6">
          <InputField
            label="Full name"
            name="name"
            type={"text"}
            placeholder="Enter your full name"
            defaultValue={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          ></InputField>
        </div>
        <div className="mt-6">
          <InputField
            label="Date of birth"
            name="birth"
            type={"text"}
            placeholder="DD/MM/YYYY"
            defaultValue={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          ></InputField>
        </div>
        <div className="mt-6">
          <label
            htmlFor="email"
            className={`block text-[16px] font-bold font-poppins text-mischka`}
          >
            Email
          </label>
          <input
            disabled={true}
            type="email"
            className={`block h-16 w-full px-6 pl-4 pr-8 focus:outline-none sm:text-sm rounded-[32px] bg-whiteLilac text-mischka placeholder:text-regentGray outline-none border-0 focus:outline-transparent focus:ring-0 placeholder:tracking-normal`}
            defaultValue={email}
          />
        </div>
        <div className="mt-6">
          <SelectPlusInputField
            maxLength="10"
            label="Phone"
            name="phone"
            type={"text"}
            placeholder="(000) 000 - 0000"
            defaultValue={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></SelectPlusInputField>
        </div>
        <div className="w-full xl:hidden bg-white flex flex-col fixed left-4 bottom-0 py-4 ">
          <div
            onClick={() => showOverlay(false)}
            className="mr-8 py-4 flex justify-center items-center rounded-[32px] text-[13px] text-primary border border-porcelain"
          >
            Cancel
          </div>
          <div className="mr-8 py-1 mt-2 justify-center flex items-center rounded-[32px] text-[13px] text-white bg-primary">
            <CheckIcon fill="white"></CheckIcon>{" "}
            <div className="grow flex justify-center mr-4">Save changes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
