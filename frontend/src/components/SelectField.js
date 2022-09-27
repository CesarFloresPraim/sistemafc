import React from "react";

export default function SelectField() {
  return (
    <div className="mt-4">
      <label
        htmlFor="province"
        className={`block text-[16px] font-bold font-poppins text-mineShaft`}
      >
        Rent or own?
      </label>
      <select
        name="province"
        className={`flex flex-col w-full h-16 py-4 mt-[1px] text-mineShaft placeholder:text-regentGray placeholder:tracking-normal bg-whiteLilac rounded-3xl px-4 transition-all duration-100 ease-linear origin-top focus:ring-0 border-none`}
        value={addressType}
        onChange={(e) => {
          setAddressType(e.target.value);
        }}
      >
        <option value="rent">Rent</option>
        <option value="own">Own</option>
      </select>
    </div>
  );
}
